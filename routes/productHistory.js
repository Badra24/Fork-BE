const express = require("express");
const router = express.Router();

const HistoryController = require("../controller/producthistory");

router.get("/all", HistoryController.getAllhistory);
router.get("/:id", HistoryController.gethistoryById);
router.delete("/:id", HistoryController.deleteHistory);

module.exports = router;