const express = require("express");
const {
  registerController,
  loginController,
} = require("../controllers/userController");

// Router Object
const router = express.Router();

// Routers
router.post("/register", registerController);
router.post("/login", loginController);

module.exports = router;
