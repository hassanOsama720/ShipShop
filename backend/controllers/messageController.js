const mongoose = require("mongoose");
const message = require("../models/message");
const express = require("express");
const { validationResult } = require("express-validator");
var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.hashed_user ,
    pass: process.env.hashed_pass,
  },
});

exports.addMessage = (request, response, next) => {
  let errors = validationResult(request);
  if (!errors.isEmpty()) {
    let error = new Error();
    error.status = 422;
    error.message = errors
      .array()
      .reduce((current, object) => current + object.msg + " ", "");
    throw error;
  }
  const mailOptions = {
    from: "shipshopservies@gmail.com", // sender address
    to: request.body.email, // list of receivers
    subject: "ShipShop Customer Support", // Subject line
    html: "<h3>Thank you for Contacting Us</h3><h4>We have recieved your Message and we will contact you soon to solve your problem</h4><h4>Have A Good Day!</h4><h5>ShipShop Customer Support</h5> <p>Dont Replay to this message !</p> ", // plain text body
  };
  let object = new message({
    name: request.body.name,
    email: request.body.email,
    phone: request.body.phone,
    message: request.body.message,
  });
  object
    .save()
    .then((data) => {
      response.status(201).json({ message: "message sent", data });
      transporter.sendMail(mailOptions, function (err, info) {
        if (err) console.log(err);
        else console.log(info);
      });
    })
    .catch((error) => next(error));
};

exports.showMessage = (request, response, next) => {
  message
    .find({})
    .then((data) => {
      response.status(200).json({ data });
    })
    .catch((error) => {
      next(error);
    });
};

exports.deleteMessage = (request, response, next) => {
  message
    .deleteOne({ name: request.body.name })
    .then((data) => {
      response.status(200).json({ message: "deleted", data });
    })
    .catch((error) => {
      next(error);
    });
};
