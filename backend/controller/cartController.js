const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { sendResponseError } = require("../middleware/middleware");
const asyncHandler = require("express-async-handler");

const addToCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({
        userId,
        products: [{ userId, items: [] }],
      });
    }

    const product = await Product.findById(productId);

    if (!product) {
      sendResponseError(404, {
        status: "fail",
        message: "Product not found",
      }, res);
      return;
    }

    const existingItem = cart.items.find(
      (item) => item.product.toString() === productId
    );

    let imgPrd = product.imageUrls[0].secure_url;

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({
        productId: productId,
        price: product.price,
        name_product: product.name_product,
        img: imgPrd,
        quantity,
      });
    }

    cart.totalAmount = cart.items.reduce(
      (acc, item) => acc + item.quantity * product.price,
      0
    );
    await cart.save();

    res.status(200).json({
      status: "success",
      message: "Item added to cart successfully",
      data: cart,
    });
  } catch (error) {
    sendResponseError(500,{
      status: "fail",
      message: error.message,
    }, res);
  }
});

const updateQuantityCart = asyncHandler(async (req, res) => {
  const { idCart, userId, productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId: userId, _id: idCart });

    if (!cart) {
      sendResponseError(404, {
        status: "fail",
        message: "Cart not found",
      }, res);
      return;
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      sendResponseError(404, {
        status: "fail",
        message: "Item not found in cart",
      }, res);
      return;
    }

    item.quantity = quantity;

    cart.totalAmount = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    await cart.save();

    res.status(200).json({
      status: "success",
      message: "Quantity updated successfully",
      data: cart,
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getCartByIdCart = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const cart = await Cart.findById(id);
    if (!cart) {
      sendResponseError(404, "Cart not found", res);
      return;
    }
    res.json(cart);
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({ userId: id });
    if (!cart) {
      sendResponseError(404, {
        status: "fail",
        message: "Cart not found",
      }, res);
      return;
    }

    res.status(200).json(cart);
  } catch (error) {
    sendResponseError(500, {
      status: "fail",
      message: error.message,
    }, res);
  }
});

const deleteItemCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      sendResponseError(404, {
        status: "fail",
        message: "Cart not found",
      }, res);
      return;
    }

    cart.items = cart.items.filter(
      (item) => item.product.toString() !== productId
    );

    cart.totalAmount = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );

    await cart.save();

    res.status(200).json({
      status: "success",
      message: "Item deleted successfully",
      cart,
    });
  } catch (error) {
    sendResponseError(500, {
      status: "fail",
      message: error.message,
    }, res);
  }
});

const deleteCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findById(id);
    if (!cart) {
      sendResponseError(404, "Cart not found", res);
      return;
    }

    await Cart.findByIdAndDelete(id);

    res.status(200).json({
      status: "success",
      message: "Cart deleted successfully",
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

module.exports = {
  addToCart,
  updateQuantityCart,
  getCart,
  getCartByIdCart,
  deleteItemCart,
};
