const paymentModel = require("../model/paymentModel");
const userModel = require("../model/userModel");
const axios = require("axios");
const environment = require("../env/environmentVar");

const PAYSTACK_SECRET_KEY = environment.PAYSTACK_SECRET_KEY;
const PAYSTACK_BASE_URL = environment.PAYSTACK_BASE_URL;

const makingPayment = async (req, res) => {
  try {
    const { userId, amount, email, currency } = req.body;
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const paymentReference = `tnx_${Date.now()}`;

    const payment = new paymentModel({
      userId,
      amount,
      currency: currency || "NGN",
      paymentReference,
      paymentStatus: "pending",
    });

    await payment.save();

    const response = await axios.post(
      `${PAYSTACK_BASE_URL}/transaction/initialize`,
      {
        email,
        amount: amount * 100,
        currency,
        reference: paymentReference,
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
        },
      }
    );

    return res.status(201).json({
      message: "Payment initiated successfully",
      authorizationUrl: response.data.data.authorization_url,
      reference: paymentReference,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const paystackWebhook = async (req, res) => {
  const { event, data } = req.body;
  try {
    if (event === "charge.pending") {
      const payment = await paymentModel.findOne({
        paymentReference: data.reference,
      });

      if (payment) {
        payment.paymentStatus = "pending";
        payment.updatedAt = new Date();
        await payment.save();
      }
    }
    if (event === "charge.success") {
      const payment = await paymentModel.findOne({
        paymentReference: data.reference,
      });

      if (payment) {
        (payment.paymentStatus = "succeeded"),
          (payment.updatedAt = new Date()),
          await payment.save();
      }
    }

    if (event === "charge.failed") {
      const payment = await paymentModel.findOne({
        paymentReference: data.reference,
      });

      if (payment) {
        payment.paymentStatus = "failed";
        payment.updatedAt = new Date();
        await payment.save();
      }
    }

    return res.status(200).json({
      message: "Webhook received successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

module.exports = { makingPayment, paystackWebhook };
