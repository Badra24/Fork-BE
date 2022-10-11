var express = require("express");
var router = express.Router();

const addressController = require("../controller/addressController");

router.get("/", addressController.getAllAddress);
router.get("/:id", addressController.getAddressById);
router.post("/", addressController.addAddress);
router.delete("/:id", addressController.deleteAddress);

module.exports = router;
