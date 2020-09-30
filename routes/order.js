const express = require("express");

const OrderController = require("../controllers/order");
const router = express.Router();

router.post("/", OrderController.createOrder);
router.post("/pay", OrderController.postPaypal);
router.get("/success", OrderController.paypalSuccess);





module.exports = router;
