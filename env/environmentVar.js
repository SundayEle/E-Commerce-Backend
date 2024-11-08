const dotenv = require("dotenv");

dotenv.config();

const environment = {
  PORT: process.env.PORT,
  MONGODB_URI: process.env.MONGODB_URI,
};

module.exports = environment;
