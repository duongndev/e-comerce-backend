const Order = require("../models/Order");
const { sendResponseError } = require("../middleware/middleware");
const asyncHandler = require("express-async-handler");
const {
  startOfDay,
  endOfDay,
  startOfMonth,
  endOfMonth,
  startOfYear,
  endOfYear,
} = require("date-fns");

const getStatisticsDaily = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const start = startDate ? new Date(startDate) : new Date("1970-01-01");
  const end = endDate ? new Date(endDate) : new Date();

  try {
    const results = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfDay(start),
            $lte: endOfDay(end),
          },
        },
      },
      {
        $group: {
          _id: {
            date: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
            time: { $dateToString: { format: "%H:%M:%S", date: "$createdAt" } },
          },
          totalAmount: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
          totalRevenue: { $push: "$orderItems.price" },
        },
      },
      {
        $sort: { "_id.date": 1, "_id.time": 1 },
      },
    ]);

    res.json(results);
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getStatisticsMonthly = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const start = startDate ? new Date(startDate) : new Date("1970-01-01");
  const end = endDate ? new Date(endDate) : new Date();

  try {
    const results = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth(start),
            $lte: endOfMonth(end),
          },
        },
      },
      {
        $group: {
          _id: {
            month: { $month: "$createdAt" },
            year: { $year: "$createdAt" },
          },
          totalAmount: { $sum: "$totalAmount" },
          totalOrders: { $sum: 1 },
          totalRevenue: { $push: "$orderItems.price" },
          days: { $push: "$createdAt" },
        },
      },
      {
        $sort: { "_id.month": 1, "_id.year": 1 },
      },
    ]);

    res.json(results);
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getStatisticsYearly = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;
    const start = startDate? new Date(startDate) : new Date("1970-01-01");
    const end = endDate? new Date(endDate) : new Date();

    try {
      const results = await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfYear(start),
              $lte: endOfYear(end),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: "$createdAt" },
            },
            totalAmount: { $sum: "$totalAmount" },
            totalOrders: { $sum: 1 },
            totalRevenue: { $push: "$orderItems.price" },
            months: { $push: "$createdAt" },
          },
        },
        {
          $sort: { "_id.year": 1 },
        },
      ]);

      res.json(results);
    } catch (error) {
      sendResponseError(500, error.message, res);
    }
});

module.exports = {
  getStatisticsDaily,
  getStatisticsMonthly,
  getStatisticsYearly,
};
