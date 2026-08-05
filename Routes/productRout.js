const express = require("express");
const router = express.Router();
const productController = require("../Controllers/productController");

// define route
router.post("/createproduct", productController.createProduct);
router.put("/updateproduct", productController.updateProduct);

module.exports = router;
