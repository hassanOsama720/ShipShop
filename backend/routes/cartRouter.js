const express = require("express");
const router = express.Router();
const controller = require("../controllers/cartController");
const { body, query, param } = require("express-validator");
const isAuth = require("../MW/auth");

//TODO: Change Route names. Make it RESTFUL API.

router.route("/cart")
.post(
  isAuth,
  [
    body("product_id").isString().withMessage("invalid product id."),
    body("quantity").isNumeric().withMessage("invalid product quantity."),
  ],
  controller.addToCart
)
.put(
  isAuth,
  [
    body("_id").isString().withMessage("invalid product id."),
    body("qty").isNumeric().withMessage("invalid product quantity."),
  ],
  controller.updateQuantityCart
)
.delete(
  isAuth,
  [body("product_id").isString().withMessage("invalid product id.")],
  controller.removeFromCart
)
.get(
  isAuth,
  controller.getCart
)
router.route("/cart/buy")
.post(
  isAuth,
  controller.confirmCart
);
module.exports = router;