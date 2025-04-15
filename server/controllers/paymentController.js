const Razorpay = require("razorpay")
const User = require("../models/User")
const Product = require("../models/Product")
const Order = require("../models/Order")
const crypto = require('crypto');
var { validatePaymentVerification } = require('razorpay/dist/utils/razorpay-utils');
var instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const generatePayment = async (req, res) => {
    const userId = req.id
    console.log(userId);


    try {

        const { amount } = req.body

        const options = {
            amount: amount * 100,  // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            currency: "INR",
            receipt: Math.random().toString(36).substring(2)
        };

        const user = await User.findById(userId)
        console.log("hi" + user);

        if (!user) {
            return res.status(404).json({
                success: false,
                data: {
                    message: "User not found"
                }
            })
        }

        instance.orders.create(options, async (err, order) => {
            if (err) {
                console.log(err)
                return res.status(500).json({
                    success: false,
                    data: {
                        message: err
                    }
                })
            }

            return res.status(200).json({
                success: true,
                data: {
                    ...order,
                    name: user.name,
                }
            })
        });

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {
                message: error.message
            }
        })
    }
}

const verifyPayment = async (req, res) => {
    const userId = req.id;

    try {

        const { razorpay_order_id, razorpay_payment_id, amount, productArray, address } = req.body

        console.log("Received request body:", JSON.stringify(req.body, null, 2));
        console.log("Product array:", JSON.stringify(productArray, null, 2));
        console.log("Address:", address);

        const signature = crypto
            .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
            .update(`${razorpay_order_id}|${razorpay_payment_id}`)
            .digest("hex")

        const validatedPayment = validatePaymentVerification(
            { "order_id": razorpay_order_id, "payment_id": razorpay_payment_id }, signature,
            process.env.RAZORPAY_KEY_SECRET
        );

        console.log(validatedPayment);

        if (!validatedPayment) {
            return res.status(400).json({
                success: false,
                message: "Payment verification failed"
            })
        }

        for (const product of productArray) {
            console.log("Full product object:", JSON.stringify(product, null, 2));
            console.log("Product ID:", product._id);
            console.log("Product ID (alternative):", product.id);
            console.log("Product quantity:", product.quantity);

            // Check if product._id exists before proceeding
            if (!product._id) {
                console.error("Product _id is missing:", product);
                return res.status(400).json({
                    success: false,
                    message: "Product ID is missing in the request"
                });
            }

            await User.findByIdAndUpdate(
                { _id: userId },
                { $push: { purchasedProducts: product._id } })
            await Product.findByIdAndUpdate(
                { _id: product._id },
                {
                    $inc: {
                        stock: -(product.quantity || product.productQuantity || 0)
                    }
                }
            )
        }

        //  cast to ObjectId failed for value "{_id: undefiened}" (type Object) at path "_id" for model "Product"

        const orderData = {
            amount: amount / 100,
            razorpayOrderID: razorpay_order_id,
            razorpayPaymentID: razorpay_payment_id,
            razorpaySignature: signature,
            products: productArray.map(product => ({
                id: product._id,
                quantity: product.quantity || product.productQuantity,
                color: product.color
            })),
            address: address,
            userId: userId
        };
        
        console.log("Creating order with data:", JSON.stringify(orderData, null, 2));
        
        await Order.create(orderData);

        return res.status(200).json({
            success: true,
            data: {
                message: "Payment Verified!"
            }
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            data: {
                message: error.message
            }
        })
    }
}

module.exports = { generatePayment, verifyPayment }