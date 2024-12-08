const wishlistModel = require("../model/wishlistModel");
const productModel = require("../model/productModel");
const userModel = require("../model/userModel");
const notificationModel = require("../model/notificationModel");

const addWishlist = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const productId = req.params.productId;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    let wishlist = await wishlistModel.findOne({
      user: user._id,
    });
    if (!wishlist) {
      wishlist = new wishlistModel({ user: user._id, products: [] });
    }
    if (wishlist.products.includes(productId)) {
      return res.status(400).json({
        message: "Product already in wishlist",
      });
    }
    wishlist.products.push(productId);
    await wishlist.save();

    if (wishlist.user) {
      const wishlistNotification = new notificationModel({
        userId: wishlist.user._id,
        title: "New product added to wishlist",
        message: "Product added to wishlist successfully!",
        type: "wishlist",
      });
      await wishlistNotification.save();

      await userModel.findByIdAndUpdate(
        wishlist.user._id,
        { $push: { notifications: wishlistNotification._id } },
        { new: true }
      );
    }

    return res.status(201).json({
      message: "Product added to wishlist",
      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const removeProductFromWishlist = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const productId = req.params.productId;
    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const wishlist = await wishlistModel.findOne({ user: user._id });
    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist not found",
      });
    }

    if (!wishlist.products.includes(productId)) {
      return res.status(404).json({
        message: "product is not in wishlist",
      });
    }

    wishlist.products = wishlist.products.filter(
      (product) => product.toString() !== productId
    );
    await wishlist.save();

    return res.status(200).json({
      message: `${product.name} removed from wishlist successfully!`,
      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const getWishlist = async (req, res) => {
  try {
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const wishlist = await wishlistModel
      .findOne({ user: user._id })
      .populate("products");
    if (!wishlist) {
      return res.status(404).json({
        message: "Wishlist not found",
      });
    }

    return res.status(200).json({
      message: "Wishlist gotten ",
      data: wishlist,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};
module.exports = { addWishlist, removeProductFromWishlist, getWishlist };
