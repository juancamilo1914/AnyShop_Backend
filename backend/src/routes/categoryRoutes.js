const express = require("express");
const router = express.Router();
const { createCategory } = require("../controllers/categoryController");
const upload = require("../middleware/uploadImage"); 

router.post("/create", upload.single("image"), createCategory);

module.exports = router;
