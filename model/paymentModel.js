const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    default: "NGN",
  },
  paymentStatus: {
    type: String,
    default: "pending",
  },
  paymentReference: {
    type: String,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const paymentModel = mongoose.model("Payment", paymentSchema);
module.exports = paymentModel;
