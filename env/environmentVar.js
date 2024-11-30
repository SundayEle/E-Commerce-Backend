const dotenv = require("dotenv");

dotenv.config();

const environment = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
};

module.exports = environment;
