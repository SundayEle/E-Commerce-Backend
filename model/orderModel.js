const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      },
    ],

    totalPrice: {
      type: Number,
      required: true,
    },
    paymentInfo: {
      method: {
        type: String,
        required: true,
      },
      transactionId: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "Pending",
        "Processing",
        "Shipped",
        "Delivered",
        "Cancelled",
        "Failed",
        "Refunded",
        "Returned",
        "Rejected",
        "Lost",
        "On Hold",
        "Partially Shipped",
        "Partially Delivered",
        "Partially Refunded",
        "Partially Returned",
      ],
      default: "pending",
    },
  },
  { timestamps: true }
);

const orderModel = mongoose.model("Order", orderSchema);
module.exports = orderModel;
