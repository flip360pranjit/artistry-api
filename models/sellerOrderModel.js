const mongoose = require("mongoose");

const sellerOrderSchema = mongoose.Schema(
  {
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    order: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Order",
        required: true,
      },
      orderNo: {
        type: String,
        required: true,
      },
    },
    customerName: {
      type: String,
      required: true,
    },
    orderedOn: {
      date: {
        type: String,
        required: true,
      },
      time: {
        type: String,
        required: true,
      },
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    totalQuantity: {
      type: Number,
      required: true,
    },
    shipmentInvoice: {
      type: String,
      default: "",
    },
    deliveryStatus: {
      type: String,
      default: "Processing",
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
