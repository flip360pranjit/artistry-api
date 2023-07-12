const Contact = require("../models/contactModel");

// Create a new contact entry
const createContact = async (req, res) => {
  try {
    const { fullName, email, phoneNumber, message } = req.body;
    const contact = await Contact.create({
      fullName,
      email,
      phoneNumber,
      message,
    });
    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ error: "Failed to create contact entry" });
  }
};

// Get all contact entries
const getAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch contact entries" });
  }
};

module.exports = {
  createContact,
  getAllContacts,
};
