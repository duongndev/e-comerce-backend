const User = require("../models/User");
const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist");
const { sendResponseError } = require("../middleware/middleware");
const asyncHandler = require("express-async-handler");

const addToWishlist = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      sendResponseError(404, "User not found", res);
      return;
    }
    const product = await Product.findById(productId);
    if (!product) {
      sendResponseError(404, "Product not found", res);
      return;
    }

    // check if product already in wishlist
    const wishlist = await Wishlist.findOne({
      userId: userId,
      productId: productId,
    });
    if (wishlist) {
      sendResponseError(400, "Product already in wishlist", res);
      return;
    }

    const newWishlist = new Wishlist({
      userId: userId,
      productId: productId,
    });

    await newWishlist.save();
    res.status(201).json(newWishlist);
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const removeProductFromWishlist = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      sendResponseError(404, "User not found", res);
      return;
    }

    const product = await Product.findById(productId);
    if (!product) {
      sendResponseError(404, "Product not found", res);
      return;
    }

    const wishlist = await Wishlist.findOne({
      userId: userId,
      productId: productId,
    });
    if (!wishlist) {
      sendResponseError(404, "Product not found in wishlist", res);
      return;
    }

    await wishlist.remove();
    res.status(200).json({ message: "Product removed from wishlist" });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getWishlist = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  try {
    const wishlist = await Wishlist.find({ userId })
      .populate({
        path: "productId",
        select: "name_product price imageUrls",
      })
      .select("-_id productId");
    if (!wishlist) {
      sendResponseError(404, "Wishlist not found", res);
      return;
    }
    res.status(200).json(wishlist);
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

module.exports = { addToWishlist, removeProductFromWishlist, getWishlist };
