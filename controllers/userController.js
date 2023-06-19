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

// Controller function to switch user to seller
const switchToSeller = async (req, res) => {
  const { id } = req.params;
  const { contact, description, instagram, youtube, facebook } =
    req.body.seller;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          isSeller: true,
          sellerDetails: {
            contact,
            description,
            instagram,
            youtube,
            facebook,
          },
        },
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

module.exports = { registerController, loginController, switchToSeller };
