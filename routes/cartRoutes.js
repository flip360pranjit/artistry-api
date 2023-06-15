const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.post("/add", cartController.addToCart);
router.post("/remove", cartController.removeFromCart);

module.exports = router;
