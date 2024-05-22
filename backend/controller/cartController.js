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
      sendResponseError(404, "Product not found", res);
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

    res.json({
      status: "success",
      message: "Product added to cart",
      data: cart,
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const updateQuantityCart = asyncHandler(async (req, res) => {
  const { userId, productId, quantity } = req.body;
  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      sendResponseError(404, "Cart not found", res);
      return;
    }

    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );

    if (!item) {
      sendResponseError(404, "Item not found in cart", res);
      return;
    }

    item.quantity = quantity;

    cart.totalAmount = cart.items.reduce(
      (acc, item) => acc + item.quantity * item.price,
      0
    );
    await cart.save();

    res.json({
      status: "success",
      message: "Quantity updated in cart",
      data: cart,
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getCart = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({ userId: id });
    if (!cart) {
      sendResponseError(404, "Cart not found", res);
      return;
    }

    res.json({
      status: "success",
      message: "Cart fetched successfully",
      data: cart,
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const deleteItemCart = asyncHandler(async (req, res) => {
  const { userId, productId } = req.body;

  try {
    const cart = await Cart.findOne({ userId });

    if (!cart) {
      sendResponseError(404, "Cart not found", res);
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

    res.json({
      status: "success",
      message: "Item deleted from cart",
      data: cart,
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

module.exports = {
  addToCart,
  updateQuantityCart,
  getCart,
  deleteItemCart,
};
