const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/middleware");
const cloudinary = require("cloudinary");
const logger = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();

connectDB();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,
  secure: true,
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(logger("dev"));

const productRoutes = require("./routes/productRoutes");
const categoryRoutes = require("./routes/categoryRouter");
const userRoutes = require("./routes/userRoutes");
const cartRoutes = require("./routes/cartRouter");
const authRoutes = require("./routes/authRouter");

const api = "/api";

app.use(`/categories`, categoryRoutes);
app.use(`/products`, productRoutes);
app.use(`/users`, userRoutes);
app.use(`/cart`, cartRoutes);
app.use(`/auth`, authRoutes);

app.get("*", (req, res) => {
  res.json({ message: "API running..." });
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
