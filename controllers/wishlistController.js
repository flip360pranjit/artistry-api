const Wishlist = require("../models/wishlistModel");

// Controller method to add a product to the wishlist
const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user; // Assuming user authentication is implemented

    const wishlist = await Wishlist.findOne({ user });
    if (!wishlist) {
      // If wishlist doesn't exist, create a new one
      const newWishlist = new Wishlist({
        user,
        products: [{ product: productId }],
      });
      await newWishlist.save();
      res.status(201).json(newWishlist);
    } else {
      // If wishlist already exists, add the product to the existing wishlist
      const productIndex = wishlist.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1) {
        wishlist.products.push({ product: productId });
        await wishlist.save();
        res.status(200).json(wishlist);
      } else {
        res
          .status(400)
          .json({ error: "Product already exists in the wishlist" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to add product to wishlist" });
  }
};

// Controller method to remove a product from the wishlist
const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user; // Assuming user authentication is implemented

    const wishlist = await Wishlist.findOne({ user });
    if (!wishlist) {
      res.status(404).json({ error: "Wishlist not found" });
    } else {
      const productIndex = wishlist.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex !== -1) {
        wishlist.products.splice(productIndex, 1);
        await wishlist.save();
        res.status(200).json(wishlist);
      } else {
        res.status(400).json({ error: "Product not found in wishlist" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to remove product from wishlist" });
  }
};

module.exports = {
  addToWishlist,
  removeFromWishlist,
};
