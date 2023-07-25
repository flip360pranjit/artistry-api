const mongoose = require("mongoose");
const CommissionedArtwork = require("../models/commissionedArtworkModel");
const { sendCommissionedWorkAcceptanceEmail } = require("./emailController");

// Controller actions
const createCommissionedArtwork = async (req, res) => {
  try {
    const commissionedArtwork = await CommissionedArtwork.create(req.body);
    res.status(201).json(commissionedArtwork);
  } catch (error) {
    res.status(500).json({ error: "Failed to create commissioned artwork." });
  }
};

const getAllCommissionedArtworks = async (req, res) => {
  try {
    const commissionedArtworks = await CommissionedArtwork.find().populate(
      "artist"
    );
    res.json(commissionedArtworks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve commissioned artworks." });
  }
};

const getCommissionedArtworksByUserId = async (req, res) => {
  const userId = req.params.userId;
  const userIdObject = new mongoose.Types.ObjectId(userId);

  try {
    const commissionedArtworks = await CommissionedArtwork.find({
      artist: userIdObject,
    }).populate("artist");
    res.json(commissionedArtworks);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to retrieve commissioned artworks by user ID." });
  }
};

// Accept Commissioned Work
const acceptWork = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const commissionedArtwork = await CommissionedArtwork.findByIdAndUpdate(
      orderId,
      { status: "Accepted" },
      { new: true }
    ).populate("artist");

    await sendCommissionedWorkAcceptanceEmail(commissionedArtwork)
      .then(() => {
        // Sending the response after email is sent
        return res.status(200).json(commissionedArtwork);
      })
      .catch((error) => {
        // console.error("Error accepting work:", error);
        return res
          .status(500)
          .json({ error: "Unable to accept work at the moment." });
      });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Failed to accept commissioned artwork." });
  }
};

// Reject Commissioned Work
const rejectWork = async (req, res) => {
  const orderId = req.params.orderId;
  try {
    const commissionedArtwork = await CommissionedArtwork.findByIdAndUpdate(
      orderId,
      { status: "rejected" },
      { new: true }
    );
    res.json(commissionedArtwork);
  } catch (error) {
    res.status(500).json({ error: "Failed to accept commissioned artwork." });
  }
};

module.exports = {
  createCommissionedArtwork,
  getAllCommissionedArtworks,
  getCommissionedArtworksByUserId,
  acceptWork,
  rejectWork,
};
