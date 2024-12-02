const refundModel = require("../model/refundModel");
const userModel = require("../model/userModel");
const orderModel = require("../model/orderModel");

const requestARefund = async (req, res) => {
  try {
    const { order, reason, amount } = req.body;

    const Theuser = await userModel.findById(req.user._id);
    if (!Theuser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const existingOrder = await orderModel.findById(order);
    if (!existingOrder) {
      return res.status(404).json({
        message: "Order not found",
      });
    }
    if (!["Pending", "Processing"].includes(existingOrder.status)) {
      return res.status(400).json({
        message: "You can't request a refund for this order",
      });
    }
    if (existingOrder.amount < amount) {
      return res.status(400).json({
        message: "Requested amount exceeds order amount",
      });
    }

    const existingRefund = await refundModel.findOne({
      user: req.user._id,
      order,
    });

    if (existingRefund) {
      return res.status(409).json({
        message: "You have already requested a refund for this order",
      });
    }

    const refund = new refundModel({
      user: req.user._id,
      order,
      reason,
      amount,
    });

    await refund.save();

    existingOrder.status = "Cancelled";
    await existingOrder.save();

    return res.status(201).json({
      message: "Refund requested successfully",
      data: refund,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const getAllRefundsRequest = async (req, res) => {
  try {
    const Theuser = await userModel.findById(req.user._id);
    if (!Theuser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const refunds = await refundModel.find();
    if (!refunds) {
      return res.status(404).json({
        mesage: "No refunds found",
      });
    }

    return res.status(200).json({
      message: "Refunds retrieved successfully",
      data: refunds,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const updateRefundStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const { refundId } = req.params;

    const validStatuses = [
      "pending",
      "approved",
      "rejected",
      "cancelled",
      "refunded",
      "failed",
      "expired",
      "completed",
    ];

    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        message: "Invalid status provided",
      });
    }

    const Theuser = await userModel.findById(req.user._id);
    if (!Theuser) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const { isValidObjectId } = require("mongoose");
    if (!isValidObjectId(refundId)) {
      return res.status(400).json({
        message: "Invalid refund ID",
      });
    }

    const refund = await refundModel.findByIdAndUpdate(
      refundId,
      { status },
      { new: true }
    );

    if (!refund) {
      return res.status(404).json({
        message: "Refund not found",
      });
    }

    return res.status(200).json({
      message: "Refund status updated successfully",
      data: refund,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

module.exports = { requestARefund, getAllRefundsRequest, updateRefundStatus };
