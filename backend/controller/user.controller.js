const User = require("../models/User");
const { sendResponseError } = require("../middleware/middleware");

const getProfile = async (req, res) => {
  res.status(res.statusCode).json({ 
    status: "success",
    message: "Get profile successfully",
    data: req.user
  });
};
module.exports = { getProfile };
