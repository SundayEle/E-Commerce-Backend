const mongoose = require("mongoose");
const environment = require("../env/environmentVar");

const uri = environment.MONGODB_URI;

const databaseConnect = async () => {
  try {
    await mongoose.connect(uri);
    console.log("database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};

module.exports = databaseConnect;
