const Coupon = require("../models/couponModel");
const { getDaysInMonth } = require("../utils/helper");

// Create a new coupon
const createCoupon = async (req, res) => {
  try {
    const {
      code,
      discount,
      daysToExpire,
      offerHeading,
      offerDescription,
      image,
      theme,
    } = req.body;

    // Get the date of expiration
    const date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();

    for (let i = 0; i < daysToExpire; i++) {
      day++;
      if (day > getDaysInMonth(month, year)) {
        day = 1;
        month++;

        if (month > 12) {
          month = 1;
          year++;
        }
      }
    }
    // Format the expiration date as a number in the format YYYYMMDD
    const expirationDate = parseInt(
      `${year}${month.toString().padStart(2, "0")}${day
        .toString()
        .padStart(2, "0")}`
    );
    const coupon = new Coupon({
      code,
      discount,
      expirationDate,
      offerHeading,
      offerDescription,
      image,
      theme,
    });
    await coupon.save();
    res.status(201).json({ success: true, coupon });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Apply a coupon code
const applyCoupon = async (req, res) => {
  try {
    const { code } = req.body;

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    // Format the expiration date as a number in the format YYYYMMDD
    const currentDate = parseInt(
      `${year}${month.toString().padStart(2, "0")}${day
        .toString()
        .padStart(2, "0")}`
    );
    const coupon = await Coupon.findOne({ code });
    if (!coupon) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon code not found" });
    }
    if (coupon.expirationDate < currentDate) {
      return res
        .status(400)
        .json({ success: false, message: "Coupon code has expired" });
    }
    // Apply the coupon code logic here
    // ...
    res.status(200).json({
      success: true,
      coupon,
      message: "Coupon code applied successfully",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Remove a coupon
const removeCoupon = async (req, res) => {
  try {
    const { couponId } = req.params;
    await Coupon.findByIdAndRemove(couponId);
    res
      .status(200)
      .json({ success: true, message: "Coupon removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Get all coupons
const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.status(200).json({ success: true, coupons });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { createCoupon, applyCoupon, removeCoupon, getAllCoupons };
