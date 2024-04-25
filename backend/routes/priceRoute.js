const express = require("express")
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const { createSprice, getSprice, updateSprice } = require("../controllers/priceController");

router.post("/", protect, createSprice)
router.get("/", protect, getSprice)
router.put("/:_id", protect, updateSprice)

module.exports = router;