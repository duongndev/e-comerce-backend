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

const today = new Date();
today.setHours(0, 0, 0, 0);

const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const getStatisticsDaily = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const start = startDate ? new Date(startDate) : new Date("1970-01-01");
  const end = endDate ? new Date(endDate) : new Date();

  // check datetime now
  const today = new Date();
  if (start > today || end > today) {
    sendResponseError(400, "Invalid date range", res);
    return;
  }

  // check if start date is before end date
  if (start > end) {
    sendResponseError(400, "Start date must be before end date", res);
    return;
  }

  // aggregate data
  try {
    const products = await Order.aggregate([
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
            date: { $dateToString: { format: "%d-%m-%Y", date: "$createdAt" } },
            time: { $dateToString: { format: "%H:%M", date: "$createdAt" } },
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

    // Get the most purchased products of the day
    const mostPurchasedProducts = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfDay(start),
            $lte: endOfDay(end),
          },
        },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $group: {
          _id: "$orderItems.productId",
          name: { $first: "$orderItems.name" },
          price: { $first: "$orderItems.price" },
          image: { $first: "$orderItems.image" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.json({ products, mostPurchasedProducts });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getStatisticsMonthly = asyncHandler(async (req, res) => {
  const { startDate, endDate } = req.query;
  const start = startDate ? new Date(startDate) : new Date("1970-01-01");
  const end = endDate ? new Date(endDate) : new Date();

  try {
    const products = await Order.aggregate([
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
          days: { $push: {
            $dateToString: {
              format: "%d-%m-%Y",
              date: "$createdAt"
            }
          } },
        },
      },
      {
        $sort: { "_id.month": 1, "_id.year": 1 },
      },
    ]);

    // Get the most purchased products of the month
    const mostPurchasedProducts = await Order.aggregate([
      {
        $match: {
          createdAt: {
            $gte: startOfMonth(start),
            $lte: endOfMonth(end),
          },
        },
      },
      {
        $unwind: "$orderItems",
      },
      {
        $group: {
          _id: "$orderItems.productId",
          name: { $first: "$orderItems.name" },
          price: { $first: "$orderItems.price" },
          image: { $first: "$orderItems.image" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { count: -1 },
      },
      {
        $limit: 5,
      },
    ]);

    res.json({ products, mostPurchasedProducts });
  } catch (error) {
    sendResponseError(500, error.message, res);
  }
});

const getStatisticsYearly = asyncHandler(async (req, res) => {
    const { startDate, endDate } = req.query;
    const start = startDate? new Date(startDate) : new Date("1970-01-01");
    const end = endDate? new Date(endDate) : new Date();

    try {
      const products = await Order.aggregate([
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
            months: { $push: {
              $dateToString: {
                format: "%m-%Y",
                date: "$createdAt"
              }
            }}
          },
        },
        {
          $sort: { "_id.year": 1 },
        },
      ]);

      // Get the most purchased products of the year
      const mostPurchasedProducts = await Order.aggregate([
        {
          $match: {
            createdAt: {
              $gte: startOfYear(start),
              $lte: endOfYear(end),
            },
          },
        },
        {
          $unwind: "$orderItems",
        },
        {
          $group: {
            _id: "$orderItems.productId",
            name: { $first: "$orderItems.name" },
            price: { $first: "$orderItems.price" },
            image: { $first: "$orderItems.image" },
            count: { $sum: 1 },
          },
        },
        {
          $sort: { count: -1 },
        },
        {
          $limit: 10,
        },
      ]);

      res.json({ products, mostPurchasedProducts });
    } catch (error) {
      sendResponseError(500, error.message, res);
    }
});

module.exports = {
  getStatisticsDaily,
  getStatisticsMonthly,
  getStatisticsYearly,
};
