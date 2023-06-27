const Cart = require("../models/cartModel");

// Controller method to get the cart
const getCart = async (req, res) => {
  try {
    const { user } = req.body;

    const cart = await Cart.findOne({ user }).populate("products.product");
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ error: "Failed to get cart" });
  }
};

// Controller method to add a product to the cart
const addToCart = async (req, res) => {
  try {
    const { user, productId, quantity } = req.body;

    const cart = await Cart.findOne({ user });
    if (!cart) {
      // If cart doesn't exist, create a new one
      const newCart = new Cart({
        user,
        products: [{ product: productId, quantity: quantity }],
      });
      await newCart.save();

      const detailedCart = await Cart.findOne({ user }).populate(
        "products.product"
      );
      return res.status(201).json(detailedCart);
    } else {
      // If cart already exists, check if the product is already in the cart
      const productIndex = cart.products.findIndex(
        (p) => p.product.toString() === productId
      );
      if (productIndex === -1) {
        cart.products.push({ product: productId, quantity: quantity });
        await cart.save();

        const detailedCart = await Cart.findOne({ user }).populate(
          "products.product"
        );
        return res.status(200).json(detailedCart);
      } else {
        cart.products[productIndex].quantity += quantity;
        await cart.save();

        const detailedCart = await Cart.findOne({ user }).populate(
          "products.product"
        );
        return res.status(202).json(detailedCart);
      }
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to add product to cart" });
  }
};

// Controller method to remove a product from the cart
const removeFromCart = async (req, res) => {
  try {
    const { user, productId } = req.body;

    const cart = await Cart.findOne({ user });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (productIndex !== -1) {
      cart.products.splice(productIndex, 1);
      await cart.save();

      const detailedCart = await Cart.findOne({ user }).populate(
        "products.product"
      );
      return res.status(200).json(detailedCart);
    } else {
      return res.status(400).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to remove product from cart" });
  }
};

// Controller method to increase the quantity of a product in the cart
const setQuantity = async (req, res) => {
  try {
    const { user, productId, quantity } = req.body;

    const cart = await Cart.findOne({ user });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    const productIndex = cart.products.findIndex(
      (p) => p.product.toString() === productId
    );
    if (productIndex !== -1) {
      cart.products[productIndex].quantity = quantity;
      await cart.save();

      const detailedCart = await Cart.findOne({ user }).populate(
        "products.product"
      );
      return res.status(200).json(detailedCart);
    } else {
      return res.status(400).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    res.status(500).json({ error: "Failed to increase product quantity" });
  }
};
// Clear user Cart
const clearCart = async (req, res) => {
  try {
    const { user } = req.body;

    // Delete the user's cart
    const deletedCart = await Cart.findOneAndDelete({ user });

    if (!deletedCart) {
      return res.status(404).json({ error: "Cart not found" });
    }

    return res.status(200).json(deletedCart);
  } catch (error) {
    console.error("Error clearing cart:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getCart,
  addToCart,
  removeFromCart,
  setQuantity,
  clearCart,
};
