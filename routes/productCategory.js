const express = require("express");
const router = express.Router();

const productCategoryController = require("../controller/productCategoryController");

router.get("/", productCategoryController.getAllProductCategory);
router.get("/:id", productCategoryController.getProductCategoryById);
router.post("/", productCategoryController.addProductCategory);
router.delete("/", productCategoryController.deleteProductCategory);
router.patch("/update/:id", productCategoryController.updateProductCategory)

module.exports = router;
