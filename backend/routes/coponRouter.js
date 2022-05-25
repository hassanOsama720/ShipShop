const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { body } = require("express-validator");
// const { request } = require("http");
isAuth = require("./../MW/auth");
const controller = require("./../controllers/coponController");

router
  .route("/copon")

  .post(
    isAuth,
    [
      body("value").isNumeric().withMessage("invalid value."),
      body("code").isString().withMessage("invalid code."),
      body("custID").isString().withMessage("invalid custID."),
    ],
    controller.addCopon
  );

router
  .route("/validcopon")

  .post(
    isAuth,
    [
      body("value").isNumeric().withMessage("invalid value."),
      body("code").isString().withMessage("invalid code."),
      body("custID").isString().withMessage("invalid custID."),
    ],
    controller.validCopon

  )
  
  module.exports = router;
