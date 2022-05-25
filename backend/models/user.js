const mongoose = require("mongoose");

const uniqueArrayPlugin = require("mongoose-unique-array");
const userSchema = new mongoose.Schema({
  // _id: mongoose.Types.ObjectId,
  name: {
    type: String,
    required: true,
    trim: true,
    max: 50,
  },

  email: {
    type: String,
    unique: true,
    required: true,
    trim: true,
  },
  verified: {
    type: Boolean,
    default: false,
  },
  ban: {
    type: Boolean,
    default: false,
  },

  password: {
    type: String,
    required: true,
  },

  role: {
    type: String,
    enum: ["customer", "admin", "seller"],
    default: "customer",
  },

  address: {
    country: {
      type: String,
      max: 100,
    },
    city: {
      type: String,
      max: 100,
    },
    street: {
      type: String,
      max: 100,
    },
    building: {
      type: String,
      max: 100,
    },
  },
  cart: [
    {
      product_id: {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },
      qty: { type: Number },
      quantity: { type: Number },

      rating: { type: Number, min: 1, max: 5 },
      review: { type: Array },

      discount: { type: Number },

      brand: { type: String, min: 1, max: 100 },
      name: { type: String, min: 1, max: 100 },

      description: { type: String, min: 1, max: 100 },
      images: { type: Array },

      category_id: { type: Object },
      properties: { type: Object },

      price: { type: Number, min: 1 },
    },
  ],
  wishlist: [
    {
      product_id: {
        type: mongoose.Types.ObjectId,
        ref: "product",
      },

      rating: { type: Number, min: 1, max: 5 },
      review: { type: Array },

      discount: { type: Number },

      brand: { type: String, min: 1, max: 100 },
      name: { type: String, min: 1, max: 100 },

      description: { type: String, min: 1, max: 100 },
      images: { type: Array },

      category_id: { type: Object },
      properties: { type: Object },

      price: { type: Number, min: 1 },
    },
  ],

  orders: [{ type: mongoose.Types.ObjectId, ref: "order" }],
  //Values of types arrays and objects are stored as empty in DB
  //I could fix this by giving a default as undefined
  //TODO: SEARH THIS

  phone: {
    type: String,
  },

  products: [{ type: mongoose.Types.ObjectId, ref: "product" }],
});
userSchema.plugin(uniqueArrayPlugin);
module.exports = mongoose.model("user", userSchema);
