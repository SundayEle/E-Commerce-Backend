const productCategoryModel = require("../model/productCategoryModel");

const createACategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({ message: "Name is required" });
    }

    const existingCategory = await productCategoryModel.findOne({
      name: name,
    });

    if (existingCategory) {
      return res.status(400).json({ message: "Category already exists!" });
    }

    const newCategory = await productCategoryModel.create({
      name,
      description,
    });

    return res.status(201).json({
      message: `${newCategory.name} Category created successfully!`,
      data: newCategory,
    });
  } catch (error) {
    console.error("Error creating category:", error.message);
    return res.status(500).json({
      message: "An error occurred while creating the category.",
      error: error.message,
    });
  }
};

const updateACategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const category = await productCategoryModel.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({
        message: "Category not found!",
      });
    }
    return res.status(200).json({
      message: "Category updated successfully!",
      data: category,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const deleteACategory = async (req, res) => {
  try {
    const deletingAcategory = await productCategoryModel.findByIdAndDelete(
      req.params.id
    );
    if (!deletingAcategory) {
      return res.status(404).json({
        message: "No category found to be deleted!",
      });
    }
    return res.status(200).json({
      message: `${deleteACategory.name} Category deleted successfully!`,
      data: deletingAcategory,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const getACategory = async (req, res) => {
  try {
    const gettingACategory = await productCategoryModel
      .findById(req.params.id)
      .populate("products");
    if (!gettingACategory) {
      return res.status(404).json({
        message: "No Category with the given ID found!",
      });
    }
    return res.status(200).json({
      message: `${gettingACategory.name} category found!`,
      data: gettingACategory,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const getAllCategory = async (req, res) => {
  try {
    const gettingAllCategory = await productCategoryModel.find();
    if (!gettingAllCategory) {
      return res.status(404).json({
        message: "All categories not found!",
      });
    }

    return res.status(200).json({
      message: "All categories found!",
      data: gettingAllCategory,
    });
  } catch (error) {
    return res.status(404).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

module.exports = {
  createACategory,
  updateACategory,
  deleteACategory,
  getACategory,
  getAllCategory,
};
