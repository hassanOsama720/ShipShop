const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const controller = require("./../controllers/payController");


router
// GET> /orders > FOR ADMIN
.route("/")
.get( controller.getPay)
// POST> /orders > ADD a new order
.post(
    
    [
   
    ],
    controller.createPay
);



module.exports = router;
