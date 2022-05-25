const express = require("express");
const router = express.Router();
const { body, query, param } = require("express-validator");
const controller = require("./../controllers/messageController");

router.route("/message")
.post(
  [
    body("name").isString().withMessage("invalid name."),
    body("email").isEmail().withMessage("invalid Email address."),
    body("phone").isString().withMessage("invalid phone number."),
    body("message").isString().withMessage("invalid Message."),

  ],
  controller.addMessage
)
router
  .route("/message")
  .get(controller.showMessage)

  .delete(
    [body("name").notEmpty().withMessage("name is required")],
    controller.deleteMessage
  )

  module.exports = router;