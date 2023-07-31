const Review = require("../models/reviewModel");

// Create a new review
const createReview = async (req, res) => {
  try {
    const { user, product, artist, rating, comment, createdAt } = req.body;

    // Check if a review already exists for the user and product
    const existingReview = await Review.findOne({
      "user._id": user._id,
      product,
    });

    if (existingReview) {
      // A review already exists, send a response indicating that the user has already submitted a review for the product
      return res
        .status(201)
        .json({ message: "Review already submitted for this product" });
    }

    // Create a new review
    const review = await Review.create({
      user,
      product,
      artist,
      rating,
      comment,
      createdAt,
    });

    res.status(200).json(review);
  } catch (error) {
    res.status(500).json({ error: "Failed to create review" });
  }
};

// Get all reviews for a product
const getReviewsByProduct = async (req, res) => {
  try {
    const { artistId } = req.params;
    const reviews = await Review.find({ artist: artistId })
      .populate("user")
      .populate("artist");
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch reviews" });
  }
};

module.exports = {
  createReview,
  getReviewsByProduct,
};
