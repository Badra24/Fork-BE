const express = require("express");
const router = express.Router();



const salesReportController = require("../controller/salesReport");

router.get("/api/v1", salesReportController.getAllProduct);
router.get("/api/v1/all", salesReportController.getAllPage);





module.exports = router;
