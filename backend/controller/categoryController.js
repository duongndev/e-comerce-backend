const Category = require("../models/Category");
const cloudinary = require("cloudinary");
const fs = require("fs/promises");
const { sendResponseError } = require("../middleware/middleware");
const asyncHandler = require("express-async-handler");

const createCategory = asyncHandler(async (req, res) => {
  const { nameCate } = req.body;
  const imageUrl = {};

  try {
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "Ecommerce/Categories",
        resource_type: "image",
      });
      if (result) {
        imageUrl.public_id = result.public_id;
        imageUrl.secure_url = result.secure_url;
        fs.rm(`backend/uploads/${req.file.filename}`);
      }
    }
  } catch (error) {
    sendResponseError(res, 500, error.message);
  }

  try {
    if (!nameCate) {
      sendResponseError(400, "Please add all fields", res);
      return;
    }

    const category = await Category.create({
      nameCate: nameCate,
      imageUrl: imageUrl,
    });
    await category.save();
    res.json({
      status: "success",
      message: "Category created successfully",
      data: category,
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({});

    res.json({
      status: "success",
      message: "Categories fetched successfully",
      data: categories,
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
    });
  }
};

const getCategoryById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);
    res.json({
      status: "success",
      message: "Category fetched successfully",
      data: category,
    });
  } catch (error) {
    res.json({
      status: "fail",
      message: error.message,
    });
  }
});

const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { nameCate } = req.body;
  const imageUrl = {};

  try {
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "Ecommerce/Categories",
        resource_type: "image",
      });

      if (result) {
        imageUrl.public_id = result.public_id;
        imageUrl.secure_url = result.secure_url;
        fs.rm(`backend/uploads/${req.file.filename}`);
      }
    }
  } catch (error) {
    sendResponseError(res, 500, error.message);
  }

  try {
    if (!nameCate) {
      sendResponseError(400, "Please add all fields", res);
      return;
    }
    const category = await Category.findByIdAndUpdate(
      id,
      {
        nameCate: nameCate,
        imageUrl: imageUrl,
      },
      { new: true }
    );
    await category.save();
    res.json({
      status: "success",
      message: "Category updated successfully",
      data: category,
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findByIdAndDelete(id);

    const imageId = category.imageUrl.public_id;
    if (imageId) {
      await cloudinary.v2.uploader.destroy(imageId);
    }
    res.json({
      status: "success",
      message: "Category deleted successfully",
      data: category,
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategoryById,
};
