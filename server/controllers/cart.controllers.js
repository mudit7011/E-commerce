import Cart from "../models/cart.models.js";
import Product from "../models/product.models.js";

export const addToCart = async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.userId;

  try {

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ success: false, message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ success: false, message: "Not enough stock" });
    }
    let cart = await Cart.findOne({ user: userId });

    // agar nahi hai toh create karna padega 
    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const productIndex = cart.items.findIndex(item =>
      item.product.toString() === productId
    );

    if (productIndex > -1) {
      cart.items[productIndex].quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json({ success: true, message: "Product added to cart", cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.userId }).populate("items.product");
    if (!cart) return res.json({ success: true, cart: { items: [] } });

    res.json({ success: true, cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const removeFromCart = async (req, res) => {
  const { productId } = req.body;
  try {
    const cart = await Cart.findOne({ user: req.userId });
    if (!cart) return res.status(404).json({ success: false, message: "Cart not found" });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    res.json({ success: true, message: "Product removed from cart", cart });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


