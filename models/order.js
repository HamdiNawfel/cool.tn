const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  customer_id: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true},
  location: { type: String, required: true},
  cart: [{ title: String, quantity: Number }],
  total: { type: Number, required: true},
  date : { type : Date, default: Date.now }
});

module.exports = mongoose.model("Order", orderSchema);