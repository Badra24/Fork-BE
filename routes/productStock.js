const express = require("express");
const router = express.Router();




const product_stockContoller = require("../controller/product_stock");

router.get("/", product_stockContoller.getAllProductStock);

router.get("/:id", product_stockContoller.getProductById);

router.delete("/delete/:id", product_stockContoller.deleteProductStock);

router.post("/create",product_stockContoller.addProductStock);
    
router.patch("/update/:id", product_stockContoller.updateProductStock);




module.exports = router;
