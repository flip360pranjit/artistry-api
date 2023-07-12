const express = require("express");
const router = express.Router();

const newsletterController = require("../controllers/newsletterController");

// Add a new entry
router.post("/", newsletterController.addEmail);

// Get all entries
router.get("/", newsletterController.getAllEmails);

module.exports = router;
