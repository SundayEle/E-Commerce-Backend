const Router = require("express");
const express = require("express");
const {
  makingPayment,
  paystackWebhook,
} = require("../controller/paymentController");
const authenticatingJWT = require("../middleware/jwtDecode");

const router = Router();

router.post("/makingPayment", authenticatingJWT, makingPayment);
router.post("/paystackWebhook", express.json(), paystackWebhook);

module.exports = router;
