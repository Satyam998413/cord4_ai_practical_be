const express = require("express");
const { generateImage } = require("../controllers/image.controller");

const router = express.Router();

router.post("/generate", generateImage);

module.exports = router;
