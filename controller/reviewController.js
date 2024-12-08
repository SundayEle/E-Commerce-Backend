const productModel = require("../model/productModel");
const reviewModel = require("../model/reviewModel");
const userModel = require("../model/userModel");
const { default: mongoose } = require("mongoose");
const notificationModel = require("../model/notificationModel");

const addReview = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { rating, comment } = req.body;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
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

    if (product.user) {
      const Vendornotification = new notificationModel({
        userId: product.user._id,
        reviewId: product.reviews._id,
        title: "New review on your product",
        message: `Your product ${product.name} received a new review from ${
          user.name || "a buyer"
        }.`,
        type: "review",
      });
      await Vendornotification.save();

      await userModel.findByIdAndUpdate(
        product.user._id,
        product.reviews._id,
        { $push: { notifications: Vendornotification._id } },
        { new: true }
      );
    }

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

const updateReview = async (req, res) => {
  try {
    const { productId, reviewId } = req.params;
    const { rating, comment } = req.body;

    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        message: "Invalid review ID",
      });
    }

    const review = await reviewModel.findOne({
      _id: reviewId,
      user: req.user._id,
    });

    if (!review) {
      return res.status(404).json({
        message: "Review not found or you don't have permission to update it",
      });
    }
    review.rating = rating || review.rating;
    review.comment = comment || review.comment;
    await review.save();

    const reviews = await reviewModel.find({ product: productId });
    let avgRating = 0;

    if (reviews.length > 0) {
      avgRating =
        reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
        reviews.length;
    }
    await productModel.findByIdAndUpdate(productId, { rating: avgRating });
    return res.status(200).json({
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const deleteReview = async (req, res) => {
  try {
    const reviewId = req.params.reviewId;
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res.status(400).json({
        message: "Invalid review ID",
      });
    }

    const review = await reviewModel.findOneAndDelete({
      _id: reviewId,
      user: req.user._id,
    });
    if (!review) {
      return res.status(404).json({
        message: "Review not found or you don't have permission to delete it",
      });
    }

    const product = await productModel.findById(review.product);
    const reviews = await reviewModel.find({ product: product._id });
    const avgRating = reviews.length
      ? reviews.reduce((sum, review) => sum + (review.rating || 0), 0) /
        reviews.length
      : 0;

    product.rating = avgRating;
    product.reviews = product.reviews.filter(
      (sum) => sum.toString() != review._id.toString()
    );
    await product.save();

    return res.status(200).json({
      message: "Review deleted successfully",
      data: review,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

const getReviews = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await productModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }
    const user = await userModel.findById(req.user._id);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    const reviews = await reviewModel.find({ product: productId });

    if (!reviews || reviews.length === 0) {
      return res.status(404).json({
        message: "No reviews found",
      });
    }

    return res.status(200).json({
      message: "Reviews retrived successfully!",
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({
      message: "An error occurred!",
      data: error.message,
    });
  }
};

module.exports = { addReview, updateReview, deleteReview, getReviews };
