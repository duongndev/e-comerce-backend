const Product = require("../models/Product");
const cloudinary = require("cloudinary");
const fs = require("fs/promises");
const { sendResponseError } = require("../middleware/middleware");
const asyncHandler = require("express-async-handler");
const Category = require("../models/Category");

const createProduct = asyncHandler(async (req, res) => {
  const { name_product, description, price, categoryId, countInStock } =
    req.body;
  const imageUrls = [];
  try {
    for (const file of req.files) {
      const result = await cloudinary.v2.uploader.upload(file.path, {
        folder: "Ecommerce/Products",
        resource_type: "image",
      });
      imageUrls.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
      fs.rm(`backend/uploads/${file.filename}`);
    }
  } catch (error) {
    sendResponseError(500, error.message, res);
  }

  try {
    if (
      !name_product ||
      !description ||
      !price ||
      !categoryId ||
      !countInStock
    ) {
      sendResponseError(400, "Please add all fields", res);
      return;
    }

    const category = await Category.findById(categoryId);

    if (!category) {
      sendResponseError(404, "Category not found", res);
      return;
    }
    
    const product = await Product.create({
      name_product,
      description,
      price,
      categoryId,
      countInStock,
      imageUrls: imageUrls,
    });
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name_product, description, price, categoryId, countInStock } =
    req.body;
  const imageUrls = [];
  const product = await Product.findById(id);

  try {
    for (const file of req.files) {
      const result = await cloudinary.v2.uploader.upload(file.path, {
        folder: "Ecommerce/Products",
        resource_type: "image",
      });
      imageUrls.push({
        public_id: result.public_id,
        secure_url: result.secure_url,
      });
      fs.rm(`backend/uploads/${file.filename}`);
    }
  } catch (error) {
    sendResponseError(500, error.message, res);
  }

  try {
    if (!product) {
      sendResponseError(404, "Product not found", res);
      return;
    }
    if (
      !name_product ||
      !description ||
      !price ||
      !categoryId ||
      !countInStock
    ) {
      sendResponseError(400, "Please add all fields", res);
      return;
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      {
        name_product,
        description,
        price,
        categoryId,
        countInStock,
        imageUrls: imageUrls,
      },
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);

  try {
    if (!product) {
      sendResponseError(404, "Product not found", res);
      return;
    }

    for (const image of product.imageUrls) {
      await cloudinary.v2.uploader.destroy(image.public_id);
    }

    res.status(200).json({
      status: "success",
      message: "Product deleted successfully",
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getAllProducts = asyncHandler(async (req, res) => {
  try {
    const products = await Product.find({}).populate("categoryId");
    res.status(200).json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

const getProductById = asyncHandler(async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("categoryId");

    if (!product) {
      sendResponseError(404, {
        status: "fail",
        message: "Product not found",
      }, res);
      return;
    }

    res.status(200).json(product);
  } catch (error) {
    sendResponseError(500, `Error ${error.message}`, res);
  }
});

const getProductByCategoryId = asyncHandler(async (req, res) => {
  try {

    const category = await Category.findOne({ nameCate: req.params.name });

    if (!category) {
      sendResponseError(404,{
        status: "fail",
        message: "Category not found",
      }, res);
      return;
    }
    
    const products = await Product.find({ categoryId: category._id }).populate("categoryId");

    if (!products) {
      sendResponseError(404,{
        status: "fail",
        message: "Products not found",
      }, res);
      return;
    }
  
    res.status(200).json(products);
  } catch (error) {
    sendResponseError(500, {
      status: "fail",
      message: error.message,
    }, res);
  }
});

//
const createProductSubCategory = asyncHandler(async (req, res) => {
  const {
    name_product,
    description,
    price,
    categoryId,
    idSubCategory,
    countInStock,
  } = req.body;
});

module.exports = {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProductById,
  getProductByCategoryId,
};
