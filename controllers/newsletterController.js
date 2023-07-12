const Newsletter = require("../models/newsletterModel");

// Add new
const addEmail = async (req, res) => {
  try {
    const newsletter = await Newsletter.create(req.body);

    res.status(201).json(newsletter);
  } catch (error) {
    res.status(500).json({ error: "Failed to add email to mailing list!" });
  }
};

// Get all emails
const getAllEmails = async (req, res) => {
  try {
    const newsletters = await Newsletter.find();

    res.status(201).json(newsletters);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch emails!" });
  }
};

module.exports = {
  addEmail,
  getAllEmails,
};
