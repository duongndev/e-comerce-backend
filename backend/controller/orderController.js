const User = require("../models/User");
const Order = require("../models/Order");
const Product = require("../models/Product");
const Address = require("../models/Address");
const Cart = require("../models/Cart");
const { sendResponseError } = require("../middleware/middleware");
const asyncHandler = require("express-async-handler");

const createOrder = asyncHandler(async (req, res) => {
  const { userId, paymentMethod, addressLine, phoneNumber } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) {
      sendResponseError(404, "User not found", res);
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

    const address = await Address.findOne({ userId });

    if (!address) {
      sendResponseError(
        404,
        {
          status: "fail",
          message: "Address not found",
        },
        res
      );
      return;
    }

    const order = new Order({
      userId,
      orderItems: cart.itemsCart.map((item) => ({
        productId: item.productId,
        quantity: item.quantity,
        name: item.name,
        price: item.price,
        image: item.image,
      })),
      totalAmount: cart.totalAmount,
      shippingAddress: addressLine,
      phoneNumber: phoneNumber,
      paymentMethod,
    });

    await order.save();

    for (const item of cart.itemsCart) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { countInStock: -item.quantity }
      });
    }

    await Cart.deleteOne({ userId });

    req.io.emit("newOrder", {
      orderId: order._id,
      userId: order.userId,
      totalAmount: order.totalAmount,
    });

    res.status(200).json(order);
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

const updateOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const order = await Order.findById(id);
    if (!order) {
      sendResponseError(404, "Order not found", res);
      return;
    }

    if (!status) {
      sendResponseError(400, "Status is required", res);
      return;
    }

    order.status = status;

    await order.save();

    res.status(200).json(order);
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findById(id);
    if (!order) {
      sendResponseError(404, "Order not found", res);
      return;
    }

    res.json(order);
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getAllOrders = asyncHandler(async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getAllOrdersByUserId = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const orders = await Order.find({ userId: id });

    if (!orders) {
      sendResponseError(404, "Order not found", res);
      return;
    }

    res.status(200).json(orders);
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getOrdersByStatusOfUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { status } = req.query;

  try {
    const orders = await Order.find({ userId: id, status: status });

    if (!orders) {
      sendResponseError(404, "Order not found", res);
      return;
    }

    res.status(200).json(orders);
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

module.exports = {
  createOrder,
  updateOrder,
  getOrderById,
  getAllOrders,
  getAllOrdersByUserId,
  getOrdersByStatusOfUser,
};
