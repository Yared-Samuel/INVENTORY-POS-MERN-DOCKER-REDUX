const express = require("express");
const protect = require("../middleware/authMiddleware");
const { purchase, delivery,  getAllPurchase,  getStoreDelivery} = require("../controllers/invController");
const { sale, getAllSales, serviceSale, getServiceSale, useProducts, getUseProducts } = require("../controllers/saleController.js");
const find_price = require("../middleware/priceMiddleware");
const adjust_measurment = require("../middleware/measurmentMiddleware");
const { createDelivery, getAllDelivery} = require("../controllers/deliverControl.js");
const router = express.Router();

router.post("/purchase", protect, purchase)
router.get("/purchase", protect, getAllPurchase)
// Delivery //
router.post("/delivery", protect, createDelivery)
router.get("/delivery",  protect,getAllDelivery)
router.get("/delivery/:id", protect, getStoreDelivery)
//Sale //
router.post("/sale", protect,sale)
router.get("/sale", protect, getAllSales)
// router.get("/sale/balance", protect, getProductBalance)

// Service sale
router.post("/sale/service", protect, serviceSale)
router.get("/sale/service",protect,  getServiceSale)

// Use product
router.post("/use", protect, useProducts)
router.get("/use",protect,  getUseProducts)

module.exports = router