const Address = require("../models/Address");
const User = require("../models/User");
const { sendResponseError } = require("../middleware/middleware");
const asyncHandler = require("express-async-handler");

const getAllAddresses = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  try {
    const addresses = await Address.find({ userId });
    const user = await User.findById(userId);

    if (!user) {
      sendResponseError(404, "User not found", res);
      return;
    }


    res.status(200).json(addresses);
  } catch (error) {
    sendResponseError(res, 500, error.message);
  }
});

const createdAddresses = asyncHandler(async (req, res) => {
  const {
    userId,
    title,
    addressLine,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  } = req.body;
  try {

    const user = await User.findById(userId);

    if (!user) {
      sendResponseError(404, "User not found", res);
      return;
    }

    const address = new Address({
      userId,
      title,
      addressLine,
      city,
      state,
      country,
      pincode,
      phoneNumber,
    });
    await address.save();
    res.status(201).json(address);
  } catch (error) {
    sendResponseError(res, 500, error.message);
  }
});

const updateAddresses = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const {
    userId,
    title,
    addressLine,
    city,
    state,
    country,
    pincode,
    phoneNumber,
  } = req.body;
  try {
    const address = await Address.findByIdAndUpdate(
      id,
      {
        userId,
        title,
        addressLine,
        city,
        state,
        country,
        pincode,
        phoneNumber,
      },
      { new: true }
    );
    if (!address) {
      sendResponseError(404, "Address not found", res);
      return;
    }
    res.status(200).json(address);
  } catch (error) {
    sendResponseError(res, 500, error.message);
  }
});

const deleteAddresses = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const address = await Address.findByIdAndDelete(id);

    if (!address) {
      sendResponseError(404, "Address not found", res);
      return;
    }
    res.status(200).json(address);
  } catch (error) {
    sendResponseError(res, 500, error.message);
  }
});

const getAddressById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    const address = await Address.findById(id);
    if (!address) {
      sendResponseError(404, "Address not found", res);
      return;
    }
    res.status(200).json(address);
  } catch (error) {
    sendResponseError(res, 500, error.message);
  }
});

module.exports = {
  getAllAddresses,
  createdAddresses,
  updateAddresses,
  deleteAddresses,
  getAddressById,
};
