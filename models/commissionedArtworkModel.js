const mongoose = require("mongoose");

const commissionedArtworkSchema = new mongoose.Schema({
  artist: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  fullName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  desiredCompletionDate: {
    type: String,
    required: true,
  },
  contactMethod: {
    type: String,
    required: true,
  },
  whatsappNumber: {
    type: String,
  },
  artworkSize: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  referenceImage: {
    type: String,
  },
  dateTime: {
    date: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
  },
  status: {
    type: String,
    default: "Request Received",
  },
});

const CommissionedArtwork = mongoose.model(
  "CommissionedArtwork",
  commissionedArtworkSchema
);

module.exports = CommissionedArtwork;
