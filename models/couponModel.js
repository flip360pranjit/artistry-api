const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discount: {
    type: Number,
    required: true,
    min: 0,
  },
  expirationDate: {
    type: Date,
    required: true,
  },
  offerHeading: {
    type: String,
    required: true,
  },
  offerDescription: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  imageWebp: {
    type: String,
    required: true,
  },
  theme: {
    type: String,
    required: true,
  },
});

const Coupon = mongoose.model("Coupon", couponSchema);

module.exports = Coupon;
