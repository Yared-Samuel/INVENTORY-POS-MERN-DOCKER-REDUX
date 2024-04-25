const express = require("express");
const protect = require("../middleware/authMiddleware");
const { createServe, getServeList, updateServeList } = require("../controllers/serveListController");
const router = express.Router();

router.post("/",protect, createServe)
router.get("/",protect, getServeList)
router.patch("/:id",protect, updateServeList)


module.exports = router