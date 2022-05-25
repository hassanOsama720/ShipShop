const mongoose = require("mongoose");
const orderSchema = new mongoose.Schema(
  {
    // _id: mongoose.Types.ObjectId,
    customerID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    customerName: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    discount: {
      type: Number,
      required: false,
    },
    shippingAddress: {
      country: {
        type: String,
        required: true,
      },
      city: {
        type: String,
        required: true,
      },

      street: {
        type: String,
        required: true,
      },
      postalCode: {
        type: String,
        required: true,
      },
    
      building: {
        type: String,
        required: true,
      },
    },
    orderItems: { type: Array },
    orderDate: {
      type: Date,
    },
    orderStatus: {
      type: String,
      enum: ["pending", "packed", "shipped", "delivered", "cancelled"],
      default: "pending",
    },
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    shippingPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    paymentStatus: {
      type: String,
      default: "pending",
      enum: ["pending", "completed", "cancelled", "refund"],
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["cod", "card"],
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model("order", orderSchema);
