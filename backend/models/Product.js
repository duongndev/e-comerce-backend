const mongoose = require("mongoose");

const productSchema = mongoose.Schema(
  {
    name_product: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: mongoose.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    imageUrls: [],
    countInStock: {
      type: Number,
      required: true,
    },
    reviews: {
      type: Array,
    },
    size: {
      type: String,
    },
    color: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
