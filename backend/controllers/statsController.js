const User = require("../models/user");
const Order = require("./../models/order");
const Product = require("./../models/product");
const Category = require("./../models/category");
const asyncHandler = require("express-async-handler");

exports.getStats = asyncHandler(async (request, response, next) => {
  if (request.role != "admin") throw new Error("Not Authorized.");
  let stats = {};
  try {
    let users = await User.countDocuments({});
    let orders = await Order.countDocuments({});
    let products = await Product.countDocuments({});
    let categories = await Category.countDocuments({});
    stats = { users, orders, products, categories };
    response.status(200).json(stats);
  } catch (error) {
    response.status(403).json(error);
  }
});
