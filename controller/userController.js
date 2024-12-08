const userModel = require("../model/userModel");
const bcrypt = require("bcryptjs");
const environment = require("../env/environmentVar");
const jwt = require("jsonwebtoken");

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

    const token = jwt.sign(
      { _id: user._id, name: user.name, role: user.role },
      environment.JWT_SECRET_KEY,
      { expiresIn: "1hr" }
    );

    return res.status(200).json({
      message: `Successfully logged in ${user.username}`,
      data: token,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred while signing in",
      data: error.message,
    });
  }
};

const getOneUser = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id).populate("products");
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
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();

    if (!users) {
      return res.status(404).json({
        message: "No users found",
      });
    }

    return res.status(200).json({
      message: "All users gotten!",
      data: users,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const deleteAUser = async (req, res) => {
  try {
    const user = await userModel.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(200).json({
      message: `${user.username} deleted successfully!`,
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const { name, username, email, phoneNumber, password, confirmPassword } =
      req.body;

    const salt = 10;
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        username,
        email,
        phoneNumber,
        password: hashedPassword,
        confirmPassword: hashedPassword,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    return res.status(201).json({
      message: "User updated successfully!",
      data: user,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

module.exports = {
  signUpUser,
  signInUser,
  getOneUser,
  getAllUsers,
  deleteAUser,
  updateUser,
};
