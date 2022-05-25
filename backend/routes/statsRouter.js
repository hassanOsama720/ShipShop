const express = require("express");
const router = express.Router();
const isAuth = require("../MW/auth");

const statsController = require("../controllers/statsController");


module.exports = router;

//Get stats
router.get("/stats", isAuth, statsController.getStats);

