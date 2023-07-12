const SellerOrder = require("../models/sellerOrderModel");

// Get all seller orders
const getAllSellerOrders = async (req, res) => {
  try {
    const sellerOrders = await SellerOrder.find()
      .populate("seller")
      .populate("order._id")
      .populate("products.product");
    res.json(sellerOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

// Get seller orders by seller ID
const getSellerOrders = async (req, res) => {
  const { sellerId } = req.params;
  try {
    const sellerOrders = await SellerOrder.find({ seller: sellerId })
      .populate("order")
      .populate("products.product");
    res.json(sellerOrders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};
// Get order by ID
const getOrderById = async (req, res) => {
  const { orderId } = req.params;
  try {
    const order = await SellerOrder.findById(orderId)
      .populate("order")
      .populate("products.product");

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.json(order);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error" });
  }
};

module.exports = {
  getAllSellerOrders,
  getSellerOrders,
  getOrderById,
};
