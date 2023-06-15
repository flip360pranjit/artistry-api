const Review = require("../models/reviewModel");

// Create a new review
const createReview = async (req, res) => {
  try {
    const { user, product, rating, comment } = req.body;
    const review = await Review.create({
      user,
      product,
      rating,
      comment,
    });
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to create review" });
  }
};

// Get all reviews for a product
const getReviewsByProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await Review.find({ product: productId }).populate("user");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

module.exports = {
  createReview,
  getReviewsByProduct,
};
