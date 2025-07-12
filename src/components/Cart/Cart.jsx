import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  // Fetch cart items
  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get("http://localhost:8800/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems(res.data);
    } catch (err) {
      console.error("Error fetching cart:", err);
      alert("Failed to fetch cart.");
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Update quantity
  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      await axios.put(
        `http://localhost:8800/api/cart/${id}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      // Update locally
      setCartItems((prev) =>
        prev.map((item) =>
          item._id === id ? { ...item, quantity } : item
        )
      );
    } catch (err) {
      console.error("Error updating quantity:", err);
      alert("Failed to update quantity.");
    }
  };

  // Remove item
  const removeItem = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item.");
    }
  };

  // Clear cart
  const clearCart = async () => {
    if (!window.confirm("Are you sure you want to clear the cart?")) return;

    try {
      await axios.delete("http://localhost:8800/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
      alert("Failed to clear cart.");
    }
  };

  // Calculate total price
  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.medicineDetails?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  if (!token) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Please log in to view your cart.</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table
            border="1"
            cellPadding="10"
            cellSpacing="0"
            style={{ width: "100%", marginBottom: 20 }}
          >
            <thead>
              <tr>
                <th>Name</th>
                <th>Company</th>
                <th>Price per unit</th>
                <th>Quantity</th>
                <th>Total Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const med = item.medicineDetails || {};
                return (
                  <tr key={item._id}>
                    <td>{med.name || "Unknown"}</td>
                    <td>{med.company || "Unknown"}</td>
                    <td>${med.price ? med.price : "0.00"}</td>
                    <td>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                      >
                        -
                      </button>{" "}
                      {item.quantity}{" "}
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                      >
                        +
                      </button>
                    </td>
                    <td>
                      $
                      {med.price && item.quantity
                        ? (med.price * item.quantity).toFixed(2)
                        : "0.00"}
                    </td>
                    <td>
                      <button onClick={() => removeItem(item._id)}>Remove</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <button onClick={clearCart} style={{ marginRight: 10 }}>
            Clear Cart
          </button>
          <button onClick={() => navigate("/checkout")}>Checkout</button>
        </>
      )}
    </div>
  );
}
