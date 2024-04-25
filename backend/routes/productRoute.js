const express = require("express");
const router = express.Router();
const {createProduct, getProducts, updateProduct, getFinishedProducts, getRawProducts, getFixedProducts, getUseAndThrowProducts, getOtherProducts} = require("../controllers/productController")
const protect = require("../middleware/authMiddleware");

router.post("/", protect, createProduct)
router.get("/", protect, getProducts)
router.get("/finished", protect, getFinishedProducts)
router.get("/raw", protect, getRawProducts)
router.get("/fixed", protect, getFixedProducts)
router.get("/use", protect, getUseAndThrowProducts)
router.get("/other", protect, getOtherProducts)
router.patch("/:id",protect, updateProduct)


module.exports = router