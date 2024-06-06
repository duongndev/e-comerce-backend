const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Cart = require("../models/Cart");
const { sendResponseError } = require("../middleware/middleware");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { userId, productId, totalAmount, shippingAddress, quantity } = req.body;

  try {
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

    const cart = await Cart.findOne({ userId });

    if (!cart) {
      sendResponseError(
        404,
        {
          status: "fail",
          message: "Cart not found",
        },
        res
      );
      return;
    }

    const item = cart.itemsCart.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      sendResponseError(
        404,
        {
          status: "fail",
          message: "Item not found in cart",
          data: {},
        },
        res
      );
      return;
    }

    const order = await Order.findOne({ userId });

    if (!order) {
      sendResponseError(
        404,
        {
          status: "fail",
          message: "Order not found",
          data: {},
        },
        res
      );
      return;
    }

    



  



  } catch (err) {
    sendResponseError(
      500,
      {
        status: "fail",
        message: err.message,
        stack: err.stack,
      },
      res
    );
  }
});

const updateOrder = asyncHandler(async (req, res) => {});



module.exports = { createOrder, updateOrder };
