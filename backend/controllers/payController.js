const mongoose = require("mongoose");
const order = require("./../models/order");
const express = require("express");
const { validationResult } = require("express-validator");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

//create new order
exports.createPay = (req, res, next) => {
    const body = {
        source: req.body.token.id,
        amount: req.body.amount,
        currency: "usd"
      };
      stripe.charges.create(body, stripeChargeCallback(res));
};

exports.getPay = (req, res, next) => {
    console.log("get")

    res.send({
        message: "Hello Stripe checkout server!",
        timestamp: new Date().toISOString()
      });

};

const stripeChargeCallback = res => (stripeErr, stripeRes) => {
    console.log("ABC")
    if (stripeErr) {
      res.status(500).send({ error: stripeErr });
    } else {
      res.status(200).send({ success: stripeRes });
    }
  };