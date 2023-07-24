const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
  orderNo: {
    type: String,
    required: true,
  },
  customer: {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    displayName: {
      type: String,
      required: true,
    },
  },
  shippingAddress: {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  billingAddress: {
    fullName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    streetAddress: {
      type: String,
      required: true,
    },
    pincode: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },
  },
  products: [
    {
      productID: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Artwork",
        required: true,
      },
      title: {
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
      medium: {
        type: String,
        required: true,
      },
      category: {
        type: String,
        required: true,
      },
      size: {
        type: String,
        required: true,
      },
      price: {
        type: Number,
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
      deliveryStatus: {
        type: String,
        default: "Processing",
      },
      seller: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
    },
  ],
  sellerOrders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SellerOrder",
    },
  ],
  subtotal: {
    type: Number,
    required: true,
  },
  delivery: {
    receiptUrl: {
      type: String,
      default: "",
    },
    charges: {
      type: Number,
      required: true,
    },
  },
  tax: {
    percent: {
      type: Number,
      default: 18,
    },
    charges: {
      type: Number,
      required: true,
    },
  },
  total: {
    type: Number,
    required: true,
  },
  discount: {
    amount: {
      type: Number,
      default: 0,
    },
    coupon: {
      code: {
        type: String,
        default: "",
      },
      discount: {
        type: String,
        default: "",
      },
      expirationDate: {
        type: String,
        default: "",
      },
      offerHeading: {
        type: String,
        default: "",
      },
      offerDescription: {
        type: String,
        default: "",
      },
      image: {
        type: String,
        default: "",
      },
      imageWebp: {
        type: String,
        default: "",
      },
      theme: {
        type: String,
        default: "",
      },
    },
  },
  deliveryStatus: {
    type: String,
    default: "Processing",
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
  invoice: {
    invoiceNo: {
      type: String,
      required: true,
    },
    invoiceUrl: {
      type: String,
      required: true,
    },
  },
});

const Order = mongoose.model("Order", orderSchema);

module.exports = Order;
