const express = require("express");
const cartController = require("../controllers/cartController");
const router = express.Router();

router.post("/", cartController.getCart);
router.post("/add", cartController.addToCart);
router.post("/remove", cartController.removeFromCart);
router.post("/set", cartController.setQuantity);
router.post("/clear", cartController.clearCart);

module.exports = router;
