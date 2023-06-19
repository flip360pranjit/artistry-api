const express = require("express");
const {
  registerController,
  loginController,
  switchToSeller,
} = require("../controllers/userController");

// Router Object
const router = express.Router();

// Routers
router.post("/register", registerController);
router.post("/login", loginController);
router.put("/switch-to-seller/:id", switchToSeller);

module.exports = router;
