import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const fetchCart = async () => {
    if (!token) return;
    try {
      const res = await axios.get("https://multi-vendor-medicine-selling-e-com.vercel.app/api/cart", {
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

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;
    try {
      await axios.put(
        `https://multi-vendor-medicine-selling-e-com.vercel.app/api/cart/${id}`,
        { quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
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

  const removeItem = async (id) => {
    try {
      await axios.delete(`https://multi-vendor-medicine-selling-e-com.vercel.app/api/cart/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.error("Error removing item:", err);
      alert("Failed to remove item.");
    }
  };

  const clearCart = async () => {
    if (!window.confirm("Are you sure you want to clear the cart?")) return;
    try {
      await axios.delete("https://multi-vendor-medicine-selling-e-com.vercel.app/api/cart", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCartItems([]);
    } catch (err) {
      console.error("Error clearing cart:", err);
      alert("Failed to clear cart.");
    }
  };

  const totalPrice = cartItems.reduce((acc, item) => {
    const price = item.medicineDetails?.price || 0;
    return acc + price * item.quantity;
  }, 0);

  if (!token) {
    return (
      <div style={{ padding: 40, textAlign: "center" }}>
        <h2 style={{ color: "#333" }}>Please log in to view your cart.</h2>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "50px auto",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          color: "#2c3e50",
          marginBottom: 30,
          marginTop:80,
          borderBottom: "3px solid #3498db",
          paddingBottom: 10,
        }}
      >
        Your Cart
      </h1>

      {cartItems.length === 0 ? (
        <p style={{ fontSize: 18, color: "#7f8c8d" }}>Your cart is empty.</p>
      ) : (
        <>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              boxShadow: "0 0 12px rgba(0,0,0,0.1)",
              borderRadius: 12,
              overflow: "hidden",
              backgroundColor: "#fff",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#3498db", color: "#fff" }}>
                {["Name", "Company", "Price", "Quantity", "Total", "Actions"].map((text) => (
                  <th
                    key={text}
                    style={{
                      padding: "14px 16px",
                      textAlign: "left",
                      fontSize: 16,
                      fontWeight: 600,
                    }}
                  >
                    {text}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => {
                const med = item.medicineDetails || {};
                return (
                  <tr
                    key={item._id}
                    style={{
                      borderBottom: "1px solid #eee",
                      backgroundColor: "#fdfdfd",
                    }}
                  >
                    <td style={{ padding: 14 }}>{med.name || "Unknown"}</td>
                    <td style={{ padding: 14 }}>{med.company || "Unknown"}</td>
                    <td style={{ padding: 14 }}>${med.price || "0.00"}</td>
                    <td style={{ padding: 14 }}>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        style={qtyBtn}
                      >
                        −
                      </button>
                      <span style={{ margin: "0 12px", fontWeight: 600 }}>{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        style={qtyBtn}
                      >
                        +
                      </button>
                    </td>
                    <td style={{ padding: 14 }}>
                      ${(med.price * item.quantity).toFixed(2)}
                    </td>
                    <td style={{ padding: 14 }}>
                      <button
                        onClick={() => removeItem(item._id)}
                        style={actionBtn("danger")}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 30,
              flexWrap: "wrap",
              gap: 20,
            }}
          >
            <h2 style={{ color: "#2c3e50" }}>
              Total: <span style={{ color: "#27ae60" }}>${totalPrice.toFixed(2)}</span>
            </h2>
            <div>
              <button
                onClick={clearCart}
                style={actionBtn("warning", { marginRight: 12 })}
              >
                Clear Cart
              </button>
              <button onClick={() => navigate("/checkout")} style={actionBtn("primary")}>
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// 🔹 Reusable Button Styles
const qtyBtn = {
  padding: "6px 12px",
  fontSize: 16,
  fontWeight: "bold",
  border: "1px solid #ccc",
  borderRadius: 6,
  backgroundColor: "#ecf0f1",
  cursor: "pointer",
};

const actionBtn = (type, extra = {}) => {
  const base = {
    padding: "10px 20px",
    border: "none",
    borderRadius: 8,
    color: "#fff",
    fontWeight: "600",
    cursor: "pointer",
    transition: "background-color 0.2s ease",
    ...extra,
  };

  switch (type) {
    case "primary":
      return {
        ...base,
        backgroundColor: "#3498db",
      };
    case "danger":
      return {
        ...base,
        backgroundColor: "#e74c3c",
      };
    case "warning":
      return {
        ...base,
        backgroundColor: "#f39c12",
      };
    default:
      return base;
  }
};
