"use strict";

var express = require("express");

var router = express.Router();

var isAuth = require("../MW/auth");

var userController = require("../controllers/userController");

var _require = require("express-validator"),
    body = _require.body,
    query = _require.query,
    param = _require.param;

module.exports = router; //Get Users

router.get("/users", isAuth, userController.getUsers); //Get User

router.get("/users/:id", isAuth, userController.getUser); //Delete User 

router["delete"]("/users/:id", isAuth, userController.deleteUser); //Update User

router.put("/users/:id", isAuth, userController.updateUser);
router.get("/user/verify/:id/:token", userController.getVerify);
router.post("/user", userController.sendMsg);
module.exports = router;