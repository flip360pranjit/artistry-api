const express = require("express");
const router = express.Router();

const emailController = require("../controllers/emailController");

router.post("/confirm-order", emailController.sendEmail);

module.exports = router;
