const { default: mongoose } = require("mongoose");
const productCategoryModel = require("../model/productCategoryModel");
const productModel = require("../model/productModel");
const userModel = require("../model/userModel");

const createAProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const productCategory = await productCategoryModel.findOne({
      _id: category,
    });

    if (!name || !description || !price || !category || !stock) {
      return res.status(400).json({ message: "Please fill in all fields." });
    }

    const creatingAProduct = await productModel.create({
      name,
      description,
      price,
      image: name.charAt(0),
      category,
      stock,
      createdAt: Date.now(),
    });

    productCategory.products.push(creatingAProduct._id);
    await productCategory.save();

    return res.status(201).json({
      message: "Product created successfully",
      data: creatingAProduct,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occured!",
      data: error.message,
    });
  }
};

const getAllProducts = async (req, res) => {
  try {
    const allProducts = await productModel.find();

    if (!allProducts) {
      return res.status(404).json({
        message: "Products not found!",
      });
    }

    return res.status(200).json({
      message: "All products gotten!",
      data: allProducts,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const getAProduct = async (req, res) => {
  try {
    const product = await productModel
      .findById(req.params.id)
      .populate({ path: "reviews", select: "comment user " });

    if (!product) {
      return res.status(404).json({
        message: "No product found with the given id",
      });
    }

    return res.status(200).json({
      message: `${product.name} found!`,
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const deleteAProduct = async (req, res) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    return res.status(200).json({
      message: `${product.name} successfully deleted!`,
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const updateAProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock } = req.body;
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const product = await productModel.findByIdAndUpdate(
      req.params.id,
      {
        name,
        description,
        price,
        category,
        stock,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({
        message: "Product not found!",
      });
    }

    return res.status(200).json({
      message: "Product updated successfully!",
      data: product,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

module.exports = {
  createAProduct,
  getAllProducts,
  getAProduct,
  deleteAProduct,
  updateAProduct,
};
