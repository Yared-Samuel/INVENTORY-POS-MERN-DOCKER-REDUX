const express = require("express");
const protect = require("../middleware/authMiddleware");
const { analyzeById } = require("../controllers/analyzeController");
const router = express.Router();

router.get("/storeId/:id", protect, analyzeById)

module.exports = router