const express = require("express");
const app = express();
const { connectDB } = require("./config/db");
const cors = require("cors");
const { notFound, errorHandler } = require("./middleware/middleware");
const cloudinary = require("cloudinary");
const logger = require("morgan");
const bodyParser = require("body-parser");

const http = require('http');
const socketIo = require('socket.io');
const server = http.createServer(app);
const io = socketIo(server);

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
const orderRoutes = require("./routes/orderRouter");
const addressesRoutes = require("./routes/addressRouter");
const api = "/api";

app.use(`/categories`, categoryRoutes);
app.use(`/products`, productRoutes);
app.use(`/users`, userRoutes);
app.use(`/cart`, cartRoutes);
app.use(`/auth`, authRoutes);
app.use(`/orders`, orderRoutes);
app.use(`/addresses`, addressesRoutes);

// app.get("*", (req, res) => {
//   res.json({ message: "API running..." });
// });
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.get("/check-auth", (req, res) => {
  if (req.admin) {
    res.json({ isAuthenticated: true, admin: req.admin });
  } else {
    res.json({ isAuthenticated: false });
  }
});

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// Socket.io
io.on('connection', (socket) => {
  console.log('user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('newOrder', (data) => {
    console.log(data);
  });
});
