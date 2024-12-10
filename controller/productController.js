const { default: mongoose } = require("mongoose");
const productCategoryModel = require("../model/productCategoryModel");
const productModel = require("../model/productModel");
const userModel = require("../model/userModel");
const cloudinary = require("../config/cloudinary");

const createAProduct = async (req, res) => {
  try {
    const { name, description, price, category, stock, tags } = req.body;
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

    const existingProduct = await productModel.findOne({
      name: name,
      price: price,
    });
    if (existingProduct) {
      return res.status(400).json({ message: "Product already exists" });
    }

    const cloudImage = await cloudinary.uploader.upload(req.file.path);

    const creatingAProduct = await productModel.create({
      name,
      description,
      price,
      image: cloudImage.secure_url,
      category: category,
      tags: tags,
      stock,
      user: user._id,
      createdAt: Date.now(),
    });

    productCategory.products.push(creatingAProduct._id);
    await productCategory.save();

    user.products.push(creatingAProduct._id);
    await user.save();

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
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

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

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

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

const searchProducts = async (req, res) => {
  try {
    const { query, minPrice, maxPrice, category, name, tags } = req.query;

    if (!query && !minPrice && !maxPrice && !category && !name && !tags) {
      return res
        .status(400)
        .json({ message: "At least one filter is required." });
    }

    let filters = {};

    if (query) {
      filters.$or = [
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
        { tags: { $regex: query, $options: "i" } },
      ];
    }

    if (minPrice)
      filters.price = { ...filters.price, $gte: parseFloat(minPrice) };
    if (maxPrice)
      filters.price = { ...filters.price, $lte: parseFloat(maxPrice) };
    if (category) filters.category = { $regex: category, $options: "i" };
    if (name) filters.name = { $regex: name, $options: "i" };

    if (tags) {
      const tagArray = Array.isArray(tags) ? tags : tags.split(",");
      filters.tags = { $in: tagArray.map((tag) => tag.trim()) };
    }

    const products = await productModel.find(filters);

    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found with the given filters." });
    }

    return res.status(200).json({
      message: "Search results found!",
      data: products,
    });
  } catch (error) {
    console.error("Error in searchProducts:", error);
    return res
      .status(500)
      .json({ error: "An error occurred while searching for products." });
  }
};

module.exports = {
  createAProduct,
  getAllProducts,
  getAProduct,
  deleteAProduct,
  updateAProduct,
  searchProducts,
};
