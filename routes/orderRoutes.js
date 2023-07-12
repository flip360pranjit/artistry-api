const express = require("express");
const router = express.Router();

const orderController = require("../controllers/orderController");

// Create a new order
router.post("/", orderController.createOrder);

// Create a new order
router.get("/", orderController.getAllOrders);

// Get all of a users orders
router.get("/user-orders/:customerId", orderController.getUserOrders);

// Get an order by ID
router.get("/:id", orderController.getOrderById);

// Update the delivery status of a product in an order
router.put("/update-delivery", orderController.updateDeliveryStatus);

module.exports = router;
