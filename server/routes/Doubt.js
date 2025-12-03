// routes/Doubt.js
const express = require("express");
const router = express.Router();

const { handleDoubt } = require("../controllers/doubt");

// final endpoint: POST /api/v1/doubt
router.post("/", handleDoubt);

module.exports = router;
