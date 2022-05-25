const express = require("express");
const router = express.Router();
const isAuth = require("../MW/auth");
const categoryController = require("./../controllers/categoryController");
const orderController = require("./../controllers/orderController");
const adminController =  require("./../controllers/adminController");
const { body, query, param } = require("express-validator");

module.exports = router;

//Category Stuff
//ADD a Category
router.post(
  "/categories",
  isAuth,
  [body("name").notEmpty().withMessage("Please enter a category name")],
  categoryController.add_category
);

//Get All Categories
router.get("/categories", isAuth, categoryController.show_category);

//Delete a Category
router.delete(
  "/categories",
  isAuth,
  [
    body("id")
      .notEmpty()
      .withMessage("Enter id of category you want to delete"),
  ],
  categoryController.delete_category
);

//Order Stuff
//Get Orders
router.get("/orders", isAuth, orderController.getOrders);

//Users Stuff
//Get Users
router.get("/users", isAuth,adminController.getUsers );

