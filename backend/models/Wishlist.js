const mongoose = require("mongoose");

const wishlistSchema = new mongoose.Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        productItems: [
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

module.exports = mongoose.model("Wishlist", wishlistSchema)