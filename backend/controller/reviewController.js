const Product = require("../models/Product");
const Review = require("../models/Review");
const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { sendResponseError } = require("../middleware/middleware");

const createReviewProduct = asyncHandler(async (req, res) => {
  const { productId, rating, comment, userId } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      sendResponseError(
        404,
        {
          status: "fail",
          message: "Product not found",
        },
        res
      );
      return;
    }

    const user = await User.findById(userId);
    if (!user) {
      sendResponseError(
        404,
        {
          status: "fail",
          message: "User not found",
        },
        res
      );
      return;
    }

    // Check if the user has already reviewed the product
    const existingReview = product.reviews.find(
      (review) =>
        review.productId.toString() === productId &&
        review.userId.toString() === userId
    );

    if (existingReview) {
      sendResponseError(
        400,
        {
          status: "fail",
          message: "You have already reviewed this product",
        },
        res
      );
      return;
    }

    const review = new Review({
      userId,
      rating,
      productId,
      comment,
    });
    product.reviews.push(review._id);
    await review.save();
    await product.save();
    res.status(201).json(review);
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const updateProductReview = asyncHandler(async (req, res) => {
  const { productId, reviewId, rating, comment } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      sendResponseError(
        404,
        {
          status: "fail",
          message: "Product not found",
        },
        res
      );
      return;
    }

    const review = product.reviews.id(reviewId);

    if (!review) {
      sendResponseError(
        404,
        {
          status: "fail",
          message: "Review not found",
        },
        res
      );
      return;
    }

    if (review.user.toString() !== userId.toString()) {
      sendResponseError(
        401,
        {
          status: "fail",
          message: "Unauthorized to update this review",
        },
        res
      );
      return;
    }

    review.rating = rating;
    review.comment = comment;
    await product.save();
    res.json(review);
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const deleteProductReview = asyncHandler(async (req, res) => {
  const { productId, reviewId } = req.body;
  const userId = req.user._id;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      sendResponseError(
        404,
        {
          status: "fail",
          message: "Product not found",
        },
        res
      );
      return;
    }

    const review = product.reviews.id(reviewId);

    if (!review) {
      sendResponseError(
        404,
        {
          status: "fail",
          message: "Review not found",
        },
        res
      );
      return;
    }

    if (review.user.toString() !== userId.toString()) {
      sendResponseError(
        401,
        {
          status: "fail",
          message: "Unauthorized to delete this review",
        },
        res
      );
      return;
    }

    product.reviews.pull(reviewId);
    await product.save();
    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getAllReviewsProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findById(id).select("reviews");

    if (!product) {
      sendResponseError(
        404,
        {
          status: "fail",
          message: "Product not found",
        },
        res
      );
      return;
    }

    const reviews = await Review.find({ productId: id }).populate(
      "userId",
      "fullName"
    );

    if (!reviews) {
      sendResponseError(
        404,
        {
          status: "fail",
          message: "Reviews not found",
        },
        res
      );
      return;
    }

    product.reviews = reviews;

    // paginate
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = reviews.length;
    const totalPages = Math.ceil(total / limit);

    res.json({
      reviews: reviews.slice(startIndex, endIndex),
      totalPages,
      currentPage: page,
      totalItems: total,
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

module.exports = {
  createReviewProduct,
  updateProductReview,
  deleteProductReview,
  getAllReviewsProduct,
};
