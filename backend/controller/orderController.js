const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { sendResponseError } = require("../middleware/middleware");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { userId, cartId, productId, shippingAddress, quantity, totalAmount } =
    req.body;
    try {
    
      const user = await User.findById(userId);
      const cart = await Cart.findById(cartId);

      if (!user) {
        sendResponseError(404, "User not found", res);
        return;
      }

      if (!cart) {
        sendResponseError(404, "Cart not found", res);
        return;
      }

      const product = await Product.findById(productId);

      if (!product) {
        sendResponseError(404, "Product not found", res);
        return;
      }

      
      
    } catch (error) {
      sendResponseError(500, error.message, res);
    }
});

const updateOrder = asyncHandler(async (req, res) => {});

module.exports = { createOrder, updateOrder };
