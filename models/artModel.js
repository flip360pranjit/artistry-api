const mongoose = require("mongoose");

// Schema
const artworkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    artistId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    artistName: {
      type: String,
      required: true,
    },
  },
  medium: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    required: true,
  },
  updatedAt: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    required: true,
    default: "pending",
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const Artwork = mongoose.model("Artwork", artworkSchema);

module.exports = Artwork;
