const express = require("express");
const {
  registerController,
  loginController,
  switchToSeller,
  startCommisionedWork,
  getAllUsers,
  getAllCommissionedSellers,
} = require("../controllers/userController");

// Router Object
const router = express.Router();

// Routers
router.get("/", getAllUsers);
router.get("/sellers", getAllCommissionedSellers);
router.post("/register", registerController);
router.post("/login", loginController);
router.put("/switch-to-seller/:id", switchToSeller);
router.put("/accept-commisioned-work/:id", startCommisionedWork);

module.exports = router;
