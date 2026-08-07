const express = require("express");
const router = express.Router();
const userController = require("../Controllers/userController");

// define the routes
router.post("/createuser", userController.createUser);
router.post("/loginuser", userController.loginUser);

module.exports = router;
