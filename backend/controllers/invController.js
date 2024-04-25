const mongoose = require("mongoose");
const Product = require("../models/productModel");
const asyncHandler = require("express-async-handler");
const Inventory = require("../models/inventoryModel");
const Store = require("../models/storeModel");

const purchase = asyncHandler(async (req, res) => {
  const { product, quatity, unit_price, tin,to_mainstore, date } = req.body;
  const type = "pp";
  const user = req.user.id;
  if (!type || !product || !quatity || !date || !user || !unit_price || !to_mainstore) {
    res.status(400);
    throw new Error("Some fields are mandatory!");
  }

  const total_price = unit_price * quatity;
  
  const createPurchase = await Inventory.create({
    type,
    product,
    quatity,
    unit_price,
    total_price,
    tin,
    to_mainstore,
    date,
    user,
  });
  res.status(201).json(createPurchase);
});
// Get all purchase
const getAllPurchase = asyncHandler(async (req, res) => {
  const getPurchase = await Inventory.find({ type: "pp" })
    .populate("product", "name")
    .populate("to_mainstore", "name")
    .sort("-createdAt");
  res.send(getPurchase);
});

// Create Delivery





// Get Delivery for Specific store
const getStoreDelivery = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const storeDelivery = await Store.find({
    to_store: new mongoose.Types.ObjectId(id),
  })
    .populate("to_store", "name")
    .populate("product", "name");
  res.status(201).json(storeDelivery);
});




module.exports = {
  purchase,
  getAllPurchase,
  getStoreDelivery,
  };
