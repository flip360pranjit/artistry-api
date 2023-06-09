const express = require("express");
const registerController = require("../controllers/userController");

// Router Object
const router = express.Router();

// Routers
router.post("/register", registerController);

module.exports = router;
