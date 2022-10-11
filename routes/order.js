const express = require("express");
const router = express.Router();

const OrderController = require("../controller/order");

router.get("/all", OrderController.getAllOrder);
router.get("/:id", OrderController.getOrderByUserId);
router.post("/", OrderController.addOrder);
router.get("/invoice/:id", OrderController.getOrderByInvoice);

module.exports = router;
