const mongoose = require("mongoose");
const order = require("./../models/order");
const Products = require("./../models/product");
const express = require("express");
const { validationResult } = require("express-validator");

//create new order

exports.createOrders = (request, response, next) => {
  var total=0
  var paymentStatu;
  if (request.body.paymentType === "cod") {
    paymentStatu = "pending";
  } else if (request.body.paymentType === "card") {
    paymentStatu = "completed";
  }

  for (let i=0;i<request.body.orderItems.length;i++)
  {
   total+=request.body.orderItems[i].qty*request.body.orderItems[i].price
  }
  console.log("shippingAddress",request.body.shippingAddress)
  let object = new order({
    customerName: request.body.customerName,
    customerID: request.body.customerID,
    phoneNumber: request.body.phoneNumber,
    shippingAddress: request.body.shippingAddress,
    orderItems: request.body.orderItems,
    orderDate: request.body.orderDate,
    orderStatus: request.body.orderStatus,
    paymentStatus: paymentStatu,
    discount: request.body.discount,

    totalPrice: total,
    shippingPrice: request.body.shippingPrice,
    paymentType: request.body.paymentType,
  });
  object
    .save()
    .then((d) => {
      //UPDATE QUANTITY 
      for (let i = 0; i < request.body.orderItems.length; i++) {
        Products.findById(request.body.orderItems[i]._id)
          .then((data) => {
            if (data.quantity - request.body.orderItems[i].qty >= 0) {
              Products.findByIdAndUpdate(request.body.orderItems[i]._id, {
                $set: {
                  quantity: data.quantity - request.body.orderItems[i].qty,
                },
              }).then(res=>{});
            }
          })
          .catch((error) => {
            next(error);
          });
      }

      // response.status(201).json({ message: "order added", data });
    })
    .catch((error) => next(error.message));
};

//getMyOrdersByID
exports.getMyOrdersByID = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  if (request.role == "customer" || request.role == "admin") {
    order
      .find({ customerID: request.params.customerId })
      .then((data) => {
        response.status(200).json(data);
      })
      .catch((error) => {
        next(error.message);
      });
  } else {
    throw new Error("Not Authorized. Only customer can access to his order");
  }
};

//update orderStatus
exports.updateOrderStatus = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  if (request.role == "admin") {
    order
      .findOneAndUpdate(
        { _id: request.body.id },
        {
          $set: {
            orderStatus: req.body.orderStatus,
          },
        }
      )
      .then((data) => {
        response.status(201).json({ message: "order Status updated", data });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    throw new Error("Not Authorized. Only admin can do that");
  }
};

//get Orders
// exports.getOrders = (request, response, next) => {

//   if (request.role == "admin") {

//     order
//       .find({})
//       .then((data) => {
//         response.status(200).json(data);
//       })
//       .catch((error) => {
//         next(error);
//       });
//   } else {
//     throw new Error("Not Authorized. Only admin can do that");
//   }
// };

exports.getOrders = async (request, response, next) => {
  const qNew = request.query.new;

  if (request.role == "admin") {
    try {
      let orders;

      if (qNew) {
        orders = await order.find().sort({ createdAt: -1 }).limit(5);
      } else {
        orders = await order.find();
      }
      response.status(200).json(orders);
    } catch (err) {
      response.status(500).json(err);
    }
  } else {
    throw new Error("Not Authorized. Only admin can do that");
  }
};

//update updateOrderToPaid
exports.updateOrderToPaid = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  if (request.role == "admin") {
    order
      .findOneAndUpdate(
        { _id: request.body.id },
        {
          $set: {
            paymentStatus: req.body.paymentStatus,
            paymentType: req.body.paymentType,
          },
        }
      )
      .then((data) => {
        response.status(201).json({ message: "payment Status updated", data });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    throw new Error("Not Authorized. Only admin can do that");
  }
};

// delete order
//   exports.deleteOrder = (request, response, next) => {
//   let errors = validationResult(request);
//   if (!errors.isEmpty()) {
//     let error = new Error();
//     error.status = 422;
//     error.message = errors
//       .array()
//       .reduce((current, object) => current + object.msg + " ", "");
//     throw error;
//   }
//   if (request.role == "admin" || request.role == "customer") {
//     order
//       .findByIdAndDelete({ orderItems: request.body.orderItems })
//       .then((data) => {
//         if (data == null) throw new Error("order Is not Found!");
//         response.status(200).json({ message: "deleted" });
//       })
//       .catch((error) => next(error));
//   } else {
//     throw new Error("Not Authorized. Only admin or customer can do that");
//   }
// };

exports.deleteOrder = (request, response, next) => {
  if (request.role == "admin") {
    order
      .findByIdAndDelete({ _id: request.params.id })
      .then((data) => {
        response.status(201).json({ message: "deleted", data });
      })
      .catch((error) => {
        next(error);
      });
  } else {
    response.status(403).json({ message: "Not Autorized" });
  }
};

//UPDATE ORDER
exports.updateOrder = async (req, res) => {
  if (req.role == "admin") {
    try {
      const updatedOrder = await order.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err.message);
    }
  } else {
    response.status(403).json({ message: "Not Autorized" });
  }
};

//GET ORDER
exports.getOrder = (request, response, next) => {
  order
    .findOne({ _id: request.params.id })

    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};