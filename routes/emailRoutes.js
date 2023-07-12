const express = require("express");
const router = express.Router();

const emailController = require("../controllers/emailController");

router.post("/confirm-order", emailController.sendConfirmationEmail);
router.post("/send-shipment-details", emailController.sendShipmentEmail);

module.exports = router;
