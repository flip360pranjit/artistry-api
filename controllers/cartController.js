const Cart = require("../models/cartModel");

// Controller method to add a product to the cart
const addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const user = req.user; // Assuming user authentication is implemented

    const cart = await Cart.findOne({ user });
    if (!cart) {
      // If cart doesn't exist, create a new one
      const newCart = new Cart({
        user,
        products: [{ product: productId, quantity }],
      });
      await newCart.save();
      res.status(201).json(newCart);
    } else {
      // If cart already exists, add the product to the existing cart
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1) {
        cart.products.push({ product: productId, quantity });
        await cart.save();
        res.status(200).json(cart);
      } else {
        cart.products[productIndex].quantity += quantity;
        await cart.save();
        res.status(200).json(cart);
      }
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to add product to cart" });
  }
};

// Controller method to remove a product from the cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user; // Assuming user authentication is implemented

    const cart = await Cart.findOne({ user });
    if (!cart) {
      res.status(404).json({ error: "Cart not found" });
    } else {
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex !== -1) {
        cart.products.splice(productIndex, 1);
        await cart.save();
        res.status(200).json(cart);
      } else {
        res.status(400).json({ error: "Product not found in cart" });
      }
    }
  } catch (error) {
    res.status(400).json({ error: "Failed to remove product from cart" });
  }
};

module.exports = {
  addToCart,
  removeFromCart,
};
