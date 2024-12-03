const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
    minLength: 8,
  },
  confirmPassword: {
    type: String,
    required: true,
    minLength: 8,
  },
  notifications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "notifications",
    },
  ],
  role: {
    type: String,
    enum: ["user", "vendor", "admin"],
    default: "user",
  },
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
