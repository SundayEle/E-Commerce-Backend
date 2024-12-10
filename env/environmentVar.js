const dotenv = require("dotenv");

dotenv.config();

const environment = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
  PAYSTACK_SECRET_KEY: process.env.PAYSTACK_SECRET_KEY,
  PAYSTACK_BASE_URL: process.env.PAYSTACK_BASE_URL,
  API_SECRET: process.env.API_SECRET,
  API_KEY: process.env.API_KEY,
  CLOUD_NAME: process.env.CLOUD_NAME,
};

module.exports = environment;
