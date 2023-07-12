const express = require("express");
const router = express.Router();

const contactController = require("../controllers/contactController");

// Create a new contact entry
router.post("/", contactController.createContact);

// Get all contact entries
router.get("/", contactController.getAllContacts);

module.exports = router;
