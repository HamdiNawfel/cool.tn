const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String },
  firstName :{ type: String, required: true },
  lastName :{ type: String, required: true },
  imageUrl: { type: String },
  orders: [{ type: Schema.Types.ObjectId, ref: 'Order' }],
  date: { type : Date, default: Date.now }
});

module.exports = mongoose.model("users", userSchema);