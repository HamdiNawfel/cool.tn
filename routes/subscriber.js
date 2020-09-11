const express = require("express");

const SubscriberController = require("../controllers/subscriber");
const router = express.Router();

router.post("/", SubscriberController.createSubscriber);




module.exports = router;