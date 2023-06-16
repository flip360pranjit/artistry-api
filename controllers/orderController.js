const Order = require("../models/orderModel");
const SellerOrder = require("../models/sellerOrderModel");
const { asyncHandler } = require("../utils/helper");

// Create a new order
const createOrder = async (req, res) => {
  try {
    const order = new Order(req.body);
    const { products } = req.body;

    // Group products by seller
    const productsBySeller = {};
    for (const product of products) {
      if (!productsBySeller[product.seller]) {
        productsBySeller[product.seller] = [];
      }
      productsBySeller[product.seller].push(product);
    }

    // Create separate sellerOrders
    const sellerOrders = [];
    for (const sellerId in productsBySeller) {
      const sellerProducts = productsBySeller[sellerId];

      const sellerOrder = await SellerOrder.create({
        seller: sellerId,
        order: order._id,
        customerName,
        orderDate: order.createdAt,
        total,
        deliveryStatus,
        products: sellerProducts.map((product) => ({
          product: product._id,
          quantity: product.quantity,
        })),
      });

      sellerOrders.push(sellerOrder);
    }

    // Update order with sellerOrders references
    order.sellerOrders = sellerOrders.map((sellerOrder) => sellerOrder._id);
    await order.save();

    res.status(201).json({ order, sellerOrders });
  } catch (error) {
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get an order by ID
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ error: "Order not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch order" });
  }
};

// Update Delivery Status of Seller Order
const updateDeliveryStatus = asyncHandler(async (req, res) => {
  const { sellerOrderId, deliveryStatus } = req.body;

  // Find the sellerOrder
  const sellerOrder = await SellerOrder.findById(sellerOrderId);

  if (!sellerOrder) {
    res.status(404);
    throw new Error("Seller Order not found");
  }

  // Update the delivery status
  sellerOrder.deliveryStatus = deliveryStatus;
  await sellerOrder.save();

  // Find the parent order
  const order = await Order.findById(sellerOrder.order);

  if (!order) {
    res.status(404);
    throw new Error("Order not found");
  }

  // Update the delivery status in the parent order
  const allSellerOrdersDelivered = order.sellerOrders.every(
    (order) => order.deliveryStatus === "Delivered"
  );
  order.deliveryStatus = allSellerOrdersDelivered ? "Delivered" : "In Progress";
  await order.save();

  res.json({ sellerOrder, order });
});

module.exports = {
  createOrder,
  getOrderById,
  updateDeliveryStatus,
};
