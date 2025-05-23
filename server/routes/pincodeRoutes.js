const { addPincodes, getPincodes } = require("../controllers/pincodeController")
const verifyToken = require("../middlewares/verifyToken")
const router = require("express").Router()

router.post("/add-pincodes", verifyToken, addPincodes)
router.get("/get-pincode/:pincode", getPincodes)

module.exports = router