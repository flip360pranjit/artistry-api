const Order = require("../models/orderModel");
const SellerOrder = require("../models/sellerOrderModel");
const Artwork = require("../models/artModel");
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
        productsBySeller[product.seller] = {
          products: [],
          totalAmount: 0,
          totalQuantity: 0,
        };
      }
      productsBySeller[product.seller].products.push(product);
      productsBySeller[product.seller].totalAmount +=
        product.price * product.quantity;
      productsBySeller[product.seller].totalQuantity += product.quantity;

      // Update artwork quantity
      await Artwork.findByIdAndUpdate(
        product.productID,
        { $inc: { quantity: -product.quantity } },
        { new: true } // To get the updated artwork after the update
      )
        .then(async (artwork) => {
          if (artwork.quantity === 0) {
            artwork.status = "out of stock";
            await artwork.save();
          }
        })
        .catch((err) => console.log(err));
    }

    // Create separate sellerOrders
    const sellerOrders = [];
    for (const sellerId in productsBySeller) {
      const { products, totalAmount, totalQuantity } =
        productsBySeller[sellerId];

      const sellerOrder = await SellerOrder.create({
        seller: sellerId,
        order: { _id: order._id, orderNo: order.orderNo },
        customerName: order.customer.displayName,
        orderedOn: order.orderedOn,
        totalAmount: totalAmount,
        totalQuantity: totalQuantity,
        products: products.map((product) => ({
          product: product.productID,
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
    console.log(error);
    res.status(500).json({ error: "Failed to create order" });
  }
};

// Get a user's orders
const getAllOrders = async (req, res) => {
  try {
    // Find all orders for the given customerId
    const orders = await Order.find();

    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch user orders" });
  }
};

// Get a user's orders
const getUserOrders = async (req, res) => {
  try {
    const { customerId } = req.params;

    // Find all orders for the given customerId
    const orders = await Order.find({ "customer.customerId": customerId })
      .populate("customer.customerId")
      .populate("sellerOrders");

    res.status(200).json({ orders });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to fetch user orders" });
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
  const { sellerOrderId, deliveryStatus, shipmentInvoice } = req.body;

  // Find the sellerOrder
  const sellerOrder = await SellerOrder.findById(sellerOrderId);

  if (!sellerOrder) {
    res.status(404);
    throw new Error("Seller Order not found");
  }

  // Update the delivery status
  sellerOrder.deliveryStatus = deliveryStatus;
  if (shipmentInvoice) sellerOrder.shipmentInvoice = shipmentInvoice;
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
  getAllOrders,
  getUserOrders,
  getOrderById,
  updateDeliveryStatus,
};
