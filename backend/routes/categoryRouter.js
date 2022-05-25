const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();
const { body } = require("express-validator");
// const { request } = require("http");
 isAuth = require("./../MW/auth");
const category = require("./../models/category");
const controller = require("./../controllers/categoryController");

router
  .route("/categories")
  //GET ALL CATEGORIES
  .get(controller.show_category)
  .post(isAuth,
    [
      body("name").isAlphanumeric().withMessage("invalid Name."),
      // body("description").isString().withMessage("enter a Description")
      // body("bannerImage").isString().withMessage("enter a BannerImage"),
    ],

    controller.add_category
  )
  //DELETE A CATEGORY WITH ID
  // .delete(isAuth,
  //   [body("id").notEmpty().withMessage("ID Should be a object_ID")],
  //   controller.delete_category
  // )
  .put(isAuth,
    [
      body("name").isAlphanumeric().withMessage("invalid Name."),
      body("description").isString().withMessage("enter valid price"),
      body("bannerImage").isString().withMessage("enter brand name"),
    ],
    controller.update_category
  );

router.route("/categories/:id").delete(isAuth, controller.delete_category);
router.route("/categories/:id").put(isAuth, controller.update_category);

router.route("/category/:id").get(function (request, response, next) {
  let category_id = request.params.id;
  response.redirect(307,"/products/"+category_id);
});



module.exports = router;
