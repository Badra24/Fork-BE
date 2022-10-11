const express = require("express");
const router = express.Router();
 const fileUploader = require("../lib/uploader")



const productController = require("../controller/productController");

router.get("/api/v1", productController.getAllProduct);
router.get("/api/v1/allProduct", productController.getAllProductPage);


router.get("/:id", productController.getProductById);

router.delete("/delete/:id", productController.deleteProduct);

router.post(
    "/create",fileUploader({
      destinationFolder: "product_images",
      fileType: "image",
      prefix: "product",}).single("img_product"),
    productController.createProduct);
    
router.patch("/update/:id",fileUploader({
  destinationFolder: "product_images",
  fileType: "image",
  prefix: "product",}).single("img_product"), productController.updateProduct);




module.exports = router;
