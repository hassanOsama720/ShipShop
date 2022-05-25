const mongoose = require("mongoose");
const Copon = require("./../models/copon");
const User = require("./../models/user");

const express = require("express");
const { validationResult } = require("express-validator");
exports.addCopon = (request, response, next) => {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }

  let object = new Copon({
    value: request.body.value,
    code: request.body.code,
    cust_copon: request.body.custID + request.body.code,
    custID: request.body.custID,
  });

  User.find({ _id: request.body.custID })
    .then((data) => {
      if (data.length === 0) {
        response.status(401).json({ message: "error", data });
      } else {
        object
          .save()
          .then((data) => {
            response.status(201).json({ message: "copon made", data });
          })
          .catch((error) => next(error));
      }
    })
    .catch((error) => {
      next(error.message);
    });
};

exports.validCopon = (request, response, next) => {
  let errors = validationResult(request);

  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }

  User.find({ _id: request.body.custID })
    .then((data) => {
      if (data.length === 0) {
        response.status(401).json({ message: "error", data });
      } else {
        Copon.find({ cust_copon: request.body.custID + request.body.code }).then(
          (data) => {
            if (data.length === 0) {
              console.log("A")
              response.status(201).json({ message: "ok", data });
            } else {
              response.status(401).json({ message: "error", data });
            }
          }
        );
      }
    })
    .catch((error) => {
      response.status(401).json({ message: "error", data });
    });
};
