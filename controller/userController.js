const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");

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

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const signingUserUp = await userModel.create({
      name,
      username,
      email,
      phoneNumber,
      password: hashedPassword,
      confirmPassword: hashedPassword,
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

const signInUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Please fill all the fields." });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(404).json({ message: "invalid email or password" });
    }

    return res.status(200).json({
      message: `Successfully logged in ${user.username}`,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred while signing up",
      data: error.message,
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }
    return res.status(200).json({
      message: `Found ${user.username} successfully!`,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred while signing up",
      data: error.message,
    });
  }
};

module.exports = { signUpUser, signInUser, getOneUser };
