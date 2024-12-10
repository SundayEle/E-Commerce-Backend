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
  tags: [
    {
      type: String,
    },
  ],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  stock: {
    type: Number,
    required: true,
  },
  rating: {},
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  createdAt: {},
  updatedAt: {},
});

productSchema.index({ name: "text", description: "text", tags: "text" });
const productModel = mongoose.model("Products", productSchema);
module.exports = productModel;
