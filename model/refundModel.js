const mongoose = require("mongoose");

const refundSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  order: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Order",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  reason: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: [
      "pending",
      "approved",
      "rejected",
      "cancelled",
      "refunded",
      "failed",
      "expired",
      "completed",
    ],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const refundModel = mongoose.model("refunds", refundSchema);
module.exports = refundModel;
