const axios = require("axios"); // manages http requests

const { validationResult } = require("express-validator");
const User = require("../models/user");
const Product = require("../models/product");
require("dotenv").config();
const ObjectId = require("mongoose").Types.ObjectId;

// this function is when the customer adds a product to his shipping cart , the poduct is appendded into an array called cart
exports.addToWishList = async (request, response, next) => {
  try {
    /*
    let errors = validationResult(request);
    if (!errors.isEmpty()) {
      let error = new Error();
      error.status = 422;
      error.message = errors
        .array()
        .reduce((current, object) => current + object.msg + " ", "");
      throw error;
    }
    */

    const user = await User.findOne({ email: request.email });
    if (!user) {
      next();
    }
    if (user == null) {
      throw new Error("email not found");
    }

    // because we still use postman , we enter the product id as a number in the body
    //when user inputs the product id , we put it in variable called product_id_var , this checks wethere the product_id is real or doesnt exist
    // we convert the number entered in the postman to objectid data type

    // all info about product that we gonna buy like price and quantity we want
    // before we add a product into user's cart , we need to check that he doesnt already have this product in his cart

    // let doesProductInCartExist = await cart.find(
    // (item) => item._id.toString() === request.body.product_id
    //);
    // if the product id exists in the product collection , then let's go on

    //we know the product_id , let's find out some info about the product
    //  const product_obj = await Product.findOne({ _id: product_id_var })
    //   .populate("price")
    //  .populate("quantity")
    //  .populate("discount");

    //doc.quantity represents the stock
    // we have to make sure that user doesnt buy quantyity more than the stock itself
    // product_obj.quantity = Math.min(
    //  request.body.quantity,
    // product_obj.quantity
    //);

    //user then pushes his product into his cart
    console.log("REQ")
    if(request.body.length===0){
    response.status(400).json({ message: "error internet connection" });
  return;
    }
    let x = request.body;
    x.qty = 1;
    user.wishlist.push(x);

    await user.save();

    response.status(200).json({ message: "done" });

    // console.log(product_obj);
  } catch (error) {
  }
};

exports.getWishList = async (request, response, next) => {
  try {
    const user = await User.findOne({ email: request.email });
    if (!user) {
      next();
    }
    if (user == null) {
      throw new Error("email not found");
    }
    // because we still use postman , we enter the product id as a number in the body
    //when user inputs the product id , we put it in variable called product_id_var , this checks wethere the product_id is real or doesnt exist
    // we convert the number entered in the postman to objectid data type
    let product_id_var = new ObjectId(request.body.product_id);

    // all info about product that we gonna buy like price and quantity we want
    // before we add a product into user's cart , we need to check that he doesnt already have this product in his cart
    let wishlist = user.wishlist;

    // let doesProductInCartExist = await cart.find(
    // (item) => item._id.toString() === request.body.product_id
    //);
    // if the product id exists in the product collection , then let's go on
    //if product doesnt exist in the product collection or product already in user's cart , then throw an error
    // if ( doesProductInCartExist) {
    //    next();
    // }
    //we know the product_id , let's find out some info about the product
    //  const product_obj = await Product.findOne({ _id: product_id_var })
    //   .populate("price")
    //  .populate("quantity")
    //  .populate("discount");
    //doc.quantity represents the stock
    // we have to make sure that user doesnt buy quantyity more than the stock itself
    // product_obj.quantity = Math.min(
    //  request.body.quantity,
    // product_obj.quantity
    //);
    response.status(200).json(user.wishlist);

    // console.log(product_obj);
  } catch (error) {
  }
};

//here we want to remove a product from user's cart
exports.removeFromWishList = async (request, response, next) => {
  try {
    //here we get the user
    const user = await User.findOne({ email: request.email });
    if (!user) {
      next();
    }

    if (user == null) {
      throw new Error("email not found");
    }

    let product_id_var = new ObjectId(request.body._id);

    // all info about product that we gonna buy like price and quantity we want

    // before we add a product into user's cart , we need to check that he doesnt already have this product in his cart
    let wishlist = user.wishlist;
  
    //we know the product_id , let's find out some info about the product
    const product_obj = await Product.findOne({ _id: product_id_var });

    //doc.quantity represents the stock
    // we have to make sure that user doesnt buy quantyity more than the stock itself

    //user then pushes his product into his cart

    user.wishlist.pull(product_obj._id);
    await user.save();
    response.status(200).json({ message: "done" });

    // console.log(product_obj);
  } catch (error) {
    next(error)
  }
};