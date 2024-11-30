const productModel = require("../model/productModel");
const reviewModel = require("../model/reviewModel");

const addReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const existingReview = await reviewModel.findOne({
      product: productId,
      user: req.user._id,
    });
    if (existingReview) {
      return res.status(400).json({
        message: "You have already reviewed this product",
      });
    }

    const review = await reviewModel.create({
      product: productId,
      user: req.user._id,
      rating: rating,
      comment: comment,
    });

    const reviews = await reviewModel.find({ product: productId });
    let avgRating = 0;

    if (reviews.length > 0) {
      avgRating =
        reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
        reviews.length;
    }
    product.rating = avgRating;
    product.reviews.push(review._id);
    await product.save();

    return res.status(200).json({
      message: "Review added successfully",
      data: {
        review,
        avgRating,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

module.exports = addReview;
