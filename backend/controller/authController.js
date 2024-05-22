const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const { sendResponseError } = require("../middleware/middleware");
const { checkPassword, newToken } = require("../utils/utility.function");

const registerUser = asyncHandler(async (req, res) => {
  const { fullName, email, password } = req.body;
  try {
    if (!fullName || !email || !password) {
      sendResponseError(400, "Please add all fields", res);
      return;
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      sendResponseError(400, "User already exists", res);
      return;
    }

    const newUser = await User.create({
      fullName,
      email,
      password,
    });
    res.json({
      status: "success",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      sendResponseError(400, "Please add all fields", res);
      return;
    }

    const user = await User.findOne({ email });

    if (!user) {
      sendResponseError(400, "User not found", res);
      return;
    }

    const isMatch = await checkPassword(password, user.password);

    if (!isMatch) {
      sendResponseError(400, "Invalid credentials", res);
      return;
    }

    const token = newToken(user);

    res.json({
      status: "success",
      message: "Login successful",
      data: token,
    });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

module.exports = { registerUser, loginUser };
