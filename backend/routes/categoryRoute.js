const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {createCategory, getCategories} = require("../controllers/categoryController");

router.post("/", protect,createCategory)
router.get("/", protect, getCategories)

module.exports = router