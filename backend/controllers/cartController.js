const axios = require("axios"); // manages http requests

const { validationResult } = require("express-validator");
const User = require("../models/user");
const Product = require("../models/product");
require("dotenv").config();
const ObjectId = require("mongoose").Types.ObjectId;

// this function is when the customer adds a product to his shipping cart , the poduct is appendded into an array called cart
exports.addToCart = async (request, response, next) => {
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
    if(request.body.length===0){
    response.status(400).json({ message: "error internet connection" });
  return;
    }
    let x = request.body;
    x.qty = 1;
    user.cart.push(x);

    await user.save();

    response.status(200).json({ message: "done" });

  } catch (error) {
    next(error)
  }
};

exports.getCart = async (request, response, next) => {
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
    let cart = user.cart;

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
    response.status(200).json(user.cart);

  } catch (error) {
    next(error)

  }
};

//here we want to remove a product from user's cart
exports.removeFromCart = async (request, response, next) => {
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
    let cart = user.cart;
  
    //we know the product_id , let's find out some info about the product
    const product_obj = await Product.findOne({ _id: product_id_var });

    //doc.quantity represents the stock
    // we have to make sure that user doesnt buy quantyity more than the stock itself

    //user then pushes his product into his cart

    user.cart.pull(product_obj._id);
    await user.save();
    response.status(200).json({ message: "done" });

  } catch (error) {
    next(error)
  }
};

//update quantity of product in the cart of user
exports.updateQuantityCart = async (request, response, next) => {
  
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
    let product_id_var = new ObjectId(request.body._id);

    // all info about product that we gonna buy like price and quantity we want

    // before we add a product into user's cart , we need to check that he doesnt already have this product in his cart
    let cart = user.cart;

    // if the product id exists in the product collection , then let's go on

    //doc.quantity represents the stock
    // we have to make sure that user doesnt buy quantyity more than the stock itself
    //now we look for the product that the user want to update quantity , and edit it

    //doc.quantity represents the stock
    // we have to make sure that user doesnt buy quantyity more than the stock itself
    //user.cart.qty=request.body.qty
    for (i = 0; i < user.cart.length; i++) {
      if (request.body._id == user.cart[i]._id&&request.body.qty) {
        user.cart[i].qty = request.body.qty;
        await user.save();
        response.status(200).json({ message: "done updating quantity" }); //user then pushes his product into his cart
        break;
      }
  
    }

  } catch (error) {
    next(error)

  }
};

//this function here , we confirm the cart , so it will become an existing order
// we POST to the order router using axios library
exports.confirmCart = async (request, response, next) => {

  const user = await User.findOne({ email: request.email });
  var totalPric=0;
  for (i=0;i<user.cart.length;i++)
  {
totalPric+=user.cart[i].price
  }
  try {
    axios.post(
      "http://127.0.0.1:8080/orders",
      {
        customerID: user._id,
        customerName: user.name,
        phoneNumber: request.body.phone,
        paymentType: request.body.paymentType,
        totalPrice:totalPric-request.body.discount,
        discount:request.body.discount,
        //here we put the user's cart into the order collection
        orderItems: user.cart,

        shippingAddress: {
          country: "egypt",
          city: request.body.city,
          street:  request.body.street,
          postalCode: "12345",
          building:  request.body.appartment,
        },
        shippingPrice: 30,
        orderStatus: "pending",
      },
      { headers: { Authorization: request.get("Authorization") } }
    );
    user.cart=[]
    await user.save()
    response.send(response.data);
  } catch (error) {
    next(error)

  }
};