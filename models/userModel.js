const mongoose = require("mongoose");

// Schema Design
const userSchema = new mongoose.Schema({
  uid: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photoURL: {
    type: String,
    required: true,
  },
  isSeller: {
    type: Boolean,
    default: false,
  },
  acceptCommisionedOrder: {
    type: Boolean,
    default: false,
  },
  sellerDetails: {
    contact: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    instagram: {
      type: String,
      default: "",
    },
    youtube: {
      type: String,
      default: "",
    },
    facebook: {
      type: String,
      default: "",
    },
  },
});

// Export Model
const userModel = mongoose.model("User", userSchema);
module.exports = userModel;
