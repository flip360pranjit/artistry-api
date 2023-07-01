const mongoose = require("mongoose");

const sellerOrderSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    orderDate: {
      type: Date,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    deliveryStatus: {
      type: String,
      required: true,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Artwork",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

const SellerOrder = mongoose.model("SellerOrder", sellerOrderSchema);

module.exports = SellerOrder;
