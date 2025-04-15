import { Minus, Plus } from "lucide-react";
import React from "react";
import { Colors } from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../redux/slices/cartSlice";
import { useToast } from "../../hooks/use-toast";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import useRazorpay from "../../hooks/use-razorpay";


export const CartProduct = (props) => {
  const {
    name,
    price,
    _id,
    image,
    rating,
    quantity,
    stock,
    blacklisted,
    color,
  } = props;

  const dispatch = useDispatch();
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { generatePayment, verifyPayment } = useRazorpay();

  const handleBuyNow = async () => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (quantity > stock) {
      toast({ title: "Product out of stock" });
      return;
    }

    if (blacklisted) {
      toast({ title: "Product isn't available for purchase" });
      return;
    }

    if (color == "") {
      toast({ title: "Please select a color" });
      return;
    }
    const order = await generatePayment(price * quantity)
    await verifyPayment(order, [{_id:_id, quantity: quantity, color: color}], "123 Shyam colony")
  };

  return (
    <div className="border w-fit rounded-2xl overflow-clip grid z-1 relative hover:shadow-md">
      <img
        src={image}
        alt={name}
        className="w-[30rem] sm:w-[20rem]   h-[20rem] object-cover rounded-t-2xl"
      />
      <div className="px-3 grid gap-1 py-2 absolute bg-white dark:bg-zinc-900 w-full bottom-0 rounded-xl">
        <h2 className="text-md ">{name}</h2>
        <span className="text-md font-semibold">₹{price}</span>
        <div className="flex justify-between my-2">
          <div className="flex gap-3 items-center">
            <div className="flex items-center gap-5 bg-gray-100 rounded-lg px-3 py-2 w-fit">
              <Minus
                size={10}
                stroke={Colors.customGray}
                onClick={() => {
                  if (quantity > 1) {
                    dispatch(removeFromCart({ _id, quantity: 1, price }));
                  }
                }}
              />
              <span className="text-slate-950 text-sm sm:text-md">
                {quantity}
              </span>
              <Plus
                size={10}
                stroke={Colors.customGray}
                onClick={() => {
                  stock === quantity
                    ? toast({ title: "Maximum stock reached" })
                    : dispatch(addToCart({ _id, quantity: 1, price }));
                }}
              />
            </div>
          </div>
          <Button onClick={handleBuyNow} size="sm">
            Buy Now
          </Button>
        </div>
      </div>
    </div>
  );
};
