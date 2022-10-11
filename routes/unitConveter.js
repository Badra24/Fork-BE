const express = require("express");
const router = express.Router();




const unitConverter = require("../controller/unitConverter");

router.get("/", unitConverter.getAllunitConverter);

router.get("/:id", unitConverter.getunitConvertertById);

router.delete("/delete/:id", unitConverter.deleteunitConverter);

router.post("/create",unitConverter.addunitConverter);
    
router.patch("/update/:id", unitConverter.updateunitConverter);




module.exports = router;
