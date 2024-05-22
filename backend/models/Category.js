const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema(
  {
    nameCate: {
      type: String,
      required: true,
    },
    imageUrl: {
      public_id: {
        type: String,
      },
      secure_url: {
        type: String,
      },
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Category = mongoose.model("Category", categorySchema);

module.exports = Category;
