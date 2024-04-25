const mongoose = require("mongoose");
const asyncHandler = require("express-async-handler");
const Store = require("../models/storeModel");
const Inventory = require("../models/inventoryModel");

const cashBalnces = asyncHandler(async (req, res) => {
  const dailyPurchase = await Inventory.aggregate([
    {
      $match: {
        type: "pp", // Filter by type "pp"
      },
    },
    {
      $group: {
        _id: "$date", // Group by date
        totalPurchase: { $sum: "$total_price" }, // Sum the total_price for each group
      },
    },
    {
      $project: {
        date: "$_id", // Rename _id to date
        totalPurchase: 1, // Include totalPurchase field
        _id: 0, // Exclude _id field
      },
    },
  ]).sort("-date");

  const dailySales = await Store.aggregate([
    {
      $match: {
        $or: [{ type: "ps" }, { type: "pps" }],
      },
    },
    {
      $group: {
        _id: "$date", // Group by date
        totalSales: { $sum: "$total_price" }, // Sum the total_price for each group
      },
    },
    {
      $project: {
        date: "$_id", // Rename _id to date
        totalSales: 1, // Include totalSales field
        _id: 0, // Exclude _id field
      },
    },
  ]).sort("-date");
  const combinedResult = dailyPurchase.concat(dailySales);
  const groupedResult = {};

  combinedResult.forEach((item) => {
    const date = item.date;
    if (!groupedResult[date]) {
      groupedResult[date] = {
        date,
        totalPurchase: 0,
        totalSales: 0,
      };
    }

    if (item.totalPurchase) {
      groupedResult[date].totalPurchase += item.totalPurchase;
    } else if (item.totalSales) {
      groupedResult[date].totalSales += item.totalSales;
    }
  });

  // Convert the groupedResult object back to an array
  const finalResult = Object.values(groupedResult);

  finalResult.sort((a, b) => new Date(b.date) - new Date(a.date));

  res.send(finalResult);
});

const analyzeById = asyncHandler(async (req, res) => {
  const storeId = req.params.id;

  const storeData = await Store.find({
    to_store: new mongoose.Types.ObjectId(storeId),
  })
    .populate("to_store", "name")
    .populate("product", "name")
    .populate("serve", "serveName")
    .sort("-date");

  const remainingQuantities = {};
  storeData.forEach((transaction) => {
    const type = transaction.type;
    if (type === "ps" || type === "pd") {
      const date = transaction.date.toDateString();

      const productName = transaction.product.name;
      // const serveName = transaction.serve.serveName || 0
      const quantity = transaction.quatity;
      const price = transaction.total_price;

      if (date) {
        remainingQuantities[date] = {};
        remainingQuantities[date]["date"] = date;
      }

      if (!(type in remainingQuantities[date])) {
        remainingQuantities[date][type] = [];
      }
      remainingQuantities[date][type].push({
        product: productName || serveName,
        quantity: quantity || 0,
        price: price || 0,
      });
    }

    if (type === "pu") {
      const date = transaction.date.toDateString();

      const productName = transaction.product.name;
      // const serveName = transaction.serve.serveName || 0
      const quantity = transaction.quatity;
      const price = transaction.total_price;
      const measured_by = transaction.measured_by;

      if (date) {
        remainingQuantities[date] = {};
        remainingQuantities[date]["date"] = date;
      }

      if (!(type in remainingQuantities[date])) {
        remainingQuantities[date][type] = [];
      }
      remainingQuantities[date][type].push({
        product: productName || serveName,
        quantity: quantity || 0,
        price: price || 0,
        measure: measured_by,
      });
    }
    if (type === "pps") {
      const date = transaction.date.toDateString();

      // const productName = transaction.product.name
      const serveName = transaction.serve.serveName;
      const quantity = transaction.quatity;
      const price = transaction.total_price;
      const measured_by = transaction.measured_by;

      if (date) {
        remainingQuantities[date] = {};
        remainingQuantities[date]["date"] = date;
      }

      if (!(type in remainingQuantities[date])) {
        remainingQuantities[date][type] = [];
      }
      remainingQuantities[date][type].push({
        product: serveName,
        quantity: quantity || 0,
        price: price || 0,
        measure: measured_by,
      });
    }
  });

  res.status(201).json(remainingQuantities);
});

module.exports = {
  cashBalnces,
  analyzeById,
};
