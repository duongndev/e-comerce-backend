const User = require("../models/User");
const { sendResponseError } = require("../middleware/middleware");
const asyncHandler = require("express-async-handler");


const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    sendResponseError(res, 500, error.message);
  }
});

const getProfile = async (req, res) => {
  res.status(200).json(req.user);
};
module.exports = { 
  getAllUsers, 
  getProfile 
};
