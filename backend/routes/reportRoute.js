const express = require("express");
const protect = require("../middleware/authMiddleware");
const { dailyPurchases, finishedDailySales, serviceSales, dailySaleForStore,  getStoreProductBalance, getMainStoreBalance } = require("../controllers/reportsController");
const { cashBalnces } = require("../controllers/analyzeController");
const { report_store } = require("../controllers/storeReportController");
const router = express.Router();


router.get("/purchase-daily",protect,  dailyPurchases)
router.get("/sale-daily",protect,  finishedDailySales)
router.get("/serve-daily",protect,  serviceSales)
router.get("/store-sale-daily",protect,  dailySaleForStore)
router.get("/probalance",protect,  getStoreProductBalance)
router.get("/mainStoreBalance",protect,  getMainStoreBalance)
router.get("/cashBalance",protect,  cashBalnces)
router.get("/store-report/:_id",protect,  report_store)


module.exports = router
