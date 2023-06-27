const express = require("express");
const router = express.Router();
const couponController = require("../controllers/couponController");

// Create a new coupon
router.post("/", couponController.createCoupon);

// Apply a coupon code
router.post("/apply-coupon", couponController.applyCoupon);

// Remove a coupon
router.delete("/:couponId", couponController.removeCoupon);

// Get all coupons
router.get("/", couponController.getAllCoupons);

module.exports = router;
