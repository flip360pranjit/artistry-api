const Artwork = require("../models/artModel");

// Controller to create a new artwork
const createArtwork = async (req, res) => {
  try {
    const artwork = new Artwork(req.body);
    const savedArtwork = await artwork.save();
    res.status(201).json(savedArtwork);
  } catch (error) {
    res.status(500).json({ error: "Failed to create artwork" });
  }
};
// Controller to get all artworks
const getAllArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find().populate("artist.artistId");
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artworks" });
  }
};

// Controller to get active artworks
const getActiveArtworks = async (req, res) => {
  try {
    const artworks = await Artwork.find({ status: "active" }).populate(
      "artist.artistId"
    );
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artworks" });
  }
};

// Controller to get all artworks of a seller
const getSellerArtworks = async (req, res) => {
  try {
    const sellerId = req.params.sellerId;
    const artworks = await Artwork.find({ "artist.artistId": sellerId });
    res.json(artworks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artworks" });
  }
};

// Controller to get a single artwork by ID
const getArtworkById = async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artwork" });
  }
};

// Controller to update an existing artwork
const updateArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ error: "Failed to update artwork" });
  }
};

// Controller to delete an artwork
const deleteArtwork = async (req, res) => {
  try {
    const artwork = await Artwork.findByIdAndRemove(req.params.id);
    if (!artwork) {
      return res.status(404).json({ error: "Artwork not found" });
    }
    res.json({ message: "Artwork deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete artwork" });
  }
};

module.exports = {
  createArtwork,
  getAllArtworks,
  getActiveArtworks,
  getSellerArtworks,
  getArtworkById,
  updateArtwork,
  deleteArtwork,
};
