const Address = require("../models/addressModel");

// Controller method to create an address
const createAddress = async (req, res) => {
  try {
    const { address, city, pincode, state, country } = req.body;
    const user = req.user; // Assuming user authentication is implemented

    const newAddress = await Address.create({
      address,
      city,
      pincode,
      state,
      country,
      user,
    });
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(400).json({ error: "Failed to create address" });
  }
};

// Controller method to get all addresses of a user
const getAllAddresses = async (req, res) => {
  try {
    const user = req.user; // Assuming user authentication is implemented

    const addresses = await Address.find({ user });
    res.status(200).json(addresses);
  } catch (error) {
    res.status(400).json({ error: "Failed to get addresses" });
  }
};

module.exports = {
  createAddress,
  getAllAddresses,
};
