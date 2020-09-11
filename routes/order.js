const express = require("express");

const OrderController = require("../controllers/order");
const router = express.Router();

router.post("/", OrderController.createOrder);




module.exports = router;
