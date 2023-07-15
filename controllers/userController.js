const {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
} = require("firebase/auth");
const { auth } = require("../config/firebase.config");
const userModel = require("../models/userModel");

// Register Callback
const registerController = async (req, res) => {
  try {
    const { email, password } = req.body.user;

    // Create user in Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    await updateProfile(userCredential.user, {
      displayName: req.body.user.fName + " " + req.body.user.lName,
      photoURL: req.body.downloadURL,
    });
    // console.log(userCredential);

    const data = {
      uid: userCredential.user.uid,
      displayName: userCredential.user.displayName,
      email: userCredential.user.email,
      photoURL: userCredential.user.photoURL,
    };

    const user = new userModel(data);
    await user.save();
    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({
      success: false,
      error,
    });
  }
};

// Login controller
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Authenticate the user using Firebase Authentication
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Find user in MongoDB database
    const user = await userModel.findOne({ uid: userCredential.user.uid });

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
// Social Register Callback
const socialRegisterController = async (req, res) => {
  try {
    const data = req.body;

    const existingUser = await userModel.findOne({ email: data.email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "Email already exists" });
    }

    const user = new userModel(data);
    await user.save();
    return res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    // console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// Social Login controller
const socialLoginController = async (req, res) => {
  try {
    const userCredential = req.body;

    // Find user in MongoDB database
    const user = await userModel.findOne({ uid: userCredential.uid });

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
    // console.log(error);
    return res.status(400).json({
      success: false,
      message: "Something went wrong!",
    });
  }
};

// Controller function to switch user to seller
const switchToSeller = async (req, res) => {
  const { id } = req.params;
  const {
    contact,
    description,
    streetAddress,
    state,
    pincode,
    country,
    instagram,
    youtube,
    facebook,
  } = req.body.seller;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          isSeller: true,
          sellerDetails: {
            contact,
            description,
            streetAddress,
            state,
            pincode,
            country,
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

// Controller function to switch user to seller
const startCommisionedWork = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      {
        $set: {
          acceptCommisionedOrder: true,
        },
      },
      { new: true }
    );

    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: "Failed to update user" });
  }
};

// Controller to get all artworks
const getAllUsers = async (req, res) => {
  try {
    const users = await userModel.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artworks" });
  }
};
// Controller to get all artworks
const getAllCommissionedSellers = async (req, res) => {
  try {
    const users = await userModel.find({ acceptCommisionedOrder: true });
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch artworks" });
  }
};

module.exports = {
  registerController,
  loginController,
  socialRegisterController,
  socialLoginController,
  switchToSeller,
  startCommisionedWork,
  getAllUsers,
  getAllCommissionedSellers,
};
