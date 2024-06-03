const mongoose = require("mongoose");
const OrderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
   orderItems: {
      type: Array,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "Pending",
    },
    paymentStatus: { type: String, default: "Pending" },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
