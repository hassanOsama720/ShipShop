const express = require("express");
const router = express.Router();
const controller = require("./../controllers/wishlistController");
const { body, query, param } = require("express-validator");
const isAuth = require("../MW/auth");

//TODO: Change Route names. Make it RESTFUL API.

router.route("/wishlist")
.post(
  isAuth,
  [
    body("product_id").isString().withMessage("invalid product id."),
  ],
  controller.addToWishList
)

.delete(
  isAuth,
  [body("product_id").isString().withMessage("invalid product id.")],
  controller.removeFromWishList
)
.get(
  isAuth,
  controller.getWishList
)
module.exports = router;