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

// Login controller
const loginController = async (req, res) => {
  try {
    const user = await userModel.findOne({ uid: req.body.uid });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found!",
      });
    }
    return res.status(200).json({
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

module.exports = { registerController, loginController };
