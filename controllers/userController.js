const userModel = require("../models/userModel");

// Register Callback
const registerController = async (req, res) => {
  try {
    const user = new userModel(req.body);
    await user.save();
    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

module.exports = registerController;
