const Category = require("../models/Category");
const cloudinary = require("cloudinary");
const fs = require("fs/promises");
const { sendResponseError } = require("../middleware/middleware");
const asyncHandler = require("express-async-handler");

// sub category
const createSubCategory = asyncHandler(async (req, res) => {
  const {id} = req.params
  const {subName} = req.body
  const imageUrl = {}
  try {
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "Ecommerce/Categories/SubCategories",
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
    const category = await Category.findById(id)
    category.subCate.push({subName, supImage: imageUrl})
    await category.save()
    res.json({
      status: "success",
      message: "SubCategory created successfully",
      data: category.subCate,
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const updateSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { subName } = req.body;
  const imageUrl = {};

  try {
    if (req.file) {
      const result = await cloudinary.v2.uploader.upload(req.file.path, {
        folder: "Ecommerce/Categories/SubCategories",
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
    const category = await Category.findById(id);
    category.subCate = category.subCate.map((sub) => {
      if (sub._id.toString() === id) {
        sub.subName = subName;
        sub.supImage = imageUrl;
      }
      return sub;
    });
    await category.save();
    res.json({
      status: "success",
      message: "SubCategory updated successfully",
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const deleteSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;

  try {
    const category = await Category.findById(id);
    category.subCate = category.subCate.filter((sub) => sub._id.toString() !== id);

    const imageId = category.imageUrl.public_id;
    if (imageId) {
      await cloudinary.v2.uploader.destroy(imageId);
    }

    await category.save();
    res.json({
      status: "success",
      message: "SubCategory deleted successfully",
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getAllSubCategories = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const category = await Category.findById(id);

    if (!category) {
      sendResponseError(404, "Category not found", res);
      return;
    }

    if (!category.subCate) {
      sendResponseError(404, "SubCategories not found", res);
      return;
    }

    res.json({
      status: "success",
      message: "SubCategories fetched successfully",
      data: category.subCate,
    });



  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getSubCategoryById = asyncHandler(async (req, res) => {
  const { idCategory, idSub } = req.params;

  try {
    const category = await Category.findById(idCategory);

    if (!category) {
      sendResponseError(404, "Category not found", res);
      return;
    }

    if (!category.subCate) {
      sendResponseError(404, "SubCategories not found", res);
      return;
    }

    const subCategory = category.subCate.find((sub) => sub._id.toString() === idSub);

    if (!subCategory) {
      sendResponseError(404, "SubCategory not found", res);
      return;
    }

    res.json({
      status: "success",
      message: "SubCategory fetched successfully",
      data: subCategory,
    });

  } catch (error) {
    sendResponseError(500, error.message, res);
  }

});

module.exports = {
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategoryById
};
