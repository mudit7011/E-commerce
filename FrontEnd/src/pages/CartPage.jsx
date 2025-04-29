import React, { useEffect, useState } from "react";
import axios from "axios";

const CartPage = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await axios.get("/api/cart", { withCredentials: true }); // send cookies
      setCart(res.data.cart.items);
    } catch (err) {
      console.error(err);
      setMessage("Failed to load cart.");
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      await axios.post(
        "/api/cart/remove",
        { productId },
        { withCredentials: true } // send cookies
      );
      setCart(cart.filter((item) => item.product._id !== productId));
    } catch (err) {
      console.error(err);
      setMessage("Failed to remove item.");
    }
  };

  const handleCheckout = async () => {
    try {
      const res = await axios.post("/api/cart/checkout", {}, { withCredentials: true });
      setMessage(res.data.message);
      setCart([]);
    } catch (err) {
      console.error(err);
      setMessage(err.response?.data?.message || "Checkout failed.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Your Cart</h2>
      {message && <p>{message}</p>}
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item) => (
              <li key={item.product._id} style={{ marginBottom: "1rem" }}>
                <div>
                  <strong>{item.product.name}</strong> - ₹{item.product.price} x {item.quantity}
                </div>
                <button onClick={() => removeFromCart(item.product._id)}>Remove</button>
              </li>
            ))}
          </ul>
          <button onClick={handleCheckout}>Checkout</button>
        </>
      )}
    </div>
  );
};

export default CartPage;
