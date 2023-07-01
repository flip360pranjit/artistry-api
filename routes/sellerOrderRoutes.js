const express = require("express");
const router = express.Router();
const sellerOrderController = require("../controllers/sellerOrderController");

// Route to get all seller orders
router.get("/", sellerOrderController.getAllSellerOrders);

// Route to get seller orders by seller ID
router.get("/:sellerId", sellerOrderController.getSellerOrders);

// Route to get order by ID
router.get("/view-order/:orderId", sellerOrderController.getOrderById);

module.exports = router;
