const userModel = require("../model/userModel");

const signUpUser = async (req, res) => {
  try {
    const {
      name,
      username,
      email,
      phoneNumber,
      password,
      confirmPassword,
      role,
    } = req.body;

    if (
      !name ||
      !username ||
      !email ||
      !phoneNumber ||
      !password ||
      !confirmPassword
    ) {
      return res.status(400).json({ message: "Please fill all the fields." });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({ message: "Passwords do not match" });
    }

    const signingUserUp = await userModel.create({
      name,
      username,
      email,
      phoneNumber,
      password,
      confirmPassword,
      role,
    });

    return res.status(201).json({
      message: "User created successfully",
      data: signingUserUp,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred while signing up",
      data: error.message,
    });
  }
};

module.exports = signUpUser;
