const express = require("express");
const router = express.Router();

const artController = require("../controllers/artController");

// Create a new artwork
router.post("/", artController.createArtwork);

// Get all artworks
router.get("/", artController.getAllArtworks);

// Get a single artwork by ID
router.get("/:id", artController.getArtworkById);

// Update an artwork
router.put("/:id", artController.updateArtwork);

// Delete an artwork
router.delete("/:id", artController.deleteArtwork);

module.exports = router;
