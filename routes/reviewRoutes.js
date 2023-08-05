const express = require("express");
const router = express.Router();

const reviewController = require("../controllers/reviewController");

// Create a new review
router.post("/", reviewController.createReview);

// Get all reviews for a product
router.get("/:artistId", reviewController.getReviewsByProduct);

module.exports = router;
