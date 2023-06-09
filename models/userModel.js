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
});

// Export Model
const userModel = mongoose.model("users", userSchema);
module.exports = userModel;
