const express = require("express");
const wishlistController = require("../controllers/wishlistController");
const router = express.Router();

router.post("/add", wishlistController.addToWishlist);
router.post("/remove", wishlistController.removeFromWishlist);

module.exports = router;
