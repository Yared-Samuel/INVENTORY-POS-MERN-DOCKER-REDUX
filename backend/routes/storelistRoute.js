const express = require("express");
const {createStoreCategory , getStoreCategory, createStore, getStores, storeOthers, storeUseAndThrow, storeFixed, storeRaw, storeFinished, createMainStore, getMainStore} = require("../controllers/storeListCatController");
const protect = require("../middleware/authMiddleware");
const router = express.Router();

router.post("/", protect, createStoreCategory)
router.get("/", protect, getStoreCategory)
router.post("/store", protect, createStore)
router.get("/store", protect, getStores)
router.get("/store/finished", protect, storeFinished)
router.get("/store/raw", protect, storeRaw)
router.get("/store/fixed", protect, storeFixed)
router.get("/store/use", protect, storeUseAndThrow)
router.get("/store/others", protect, storeOthers)

// create main store

router.post("/main", protect, createMainStore)
router.get("/main", protect, getMainStore)

module.exports = router