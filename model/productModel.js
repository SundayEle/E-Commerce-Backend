const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxLength: 30,
    minLength: 3,
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxLength: 1100,
    minLength: 15,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "productCategory",
    required: true,
  },
  stock: {},
  rating: {},
  reviews: {},
  createdAt: {},
  updatedAt: {},
});

const productModel = mongoose.model("Products", productSchema);
module.exports = productModel;
