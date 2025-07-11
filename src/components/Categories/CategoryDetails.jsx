import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function CategoryDetails() {
  const { category } = useParams();
  const [medicines, setMedicines] = useState([]);
  const [modalMedicine, setModalMedicine] = useState(null);
  const [cart, setCart] = useState(() => {
    // Load cart from localStorage or start empty
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    fetch(`http://localhost:8800/api/medicines/category/${category}`)
      .then((res) => res.json())
      .then(setMedicines)
      .catch(console.error);
  }, [category]);

  // Save cart to localStorage on changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  // Add medicine to cart with quantity 1 or increment
  const handleSelect = (medicine) => {
    setCart((prevCart) => {
      const exists = prevCart.find((m) => m._id === medicine._id);
      if (exists) {
        return prevCart.map((m) =>
          m._id === medicine._id ? { ...m, quantity: m.quantity + 1 } : m
        );
      } else {
        return [...prevCart, { ...medicine, quantity: 1 }];
      }
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h1>Category: {category}</h1>

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: "100%" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Company</th>
            <th>Price</th>
            <th>Discount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med._id}>
              <td>{med.name}</td>
              <td>{med.company}</td>
              <td>${med.price.toFixed(2)}</td>
              <td>{med.discount}%</td>
              <td>
                <button onClick={() => setModalMedicine(med)}>👁️ Eye</button>{" "}
                <button onClick={() => handleSelect(med)}>Select</button>
              </td>
            </tr>
          ))}
          {medicines.length === 0 && (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                No medicines found in this category.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {modalMedicine && (
        <div
          onClick={() => setModalMedicine(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 8,
              maxWidth: 500,
              width: "90%",
            }}
          >
            <h2>{modalMedicine.name}</h2>
            <img
              src={modalMedicine.image || "/default-medicine.png"}
              alt={modalMedicine.name}
              style={{ width: "100%", maxHeight: 300, objectFit: "contain" }}
            />
            <p><strong>Company:</strong> {modalMedicine.company}</p>
            <p><strong>Price:</strong> ${modalMedicine.price.toFixed(2)}</p>
            <p><strong>Discount:</strong> {modalMedicine.discount}%</p>
            <p><strong>Quantity Available:</strong> {modalMedicine.quantity}</p>
            <p><strong>Description:</strong> {modalMedicine.description || "No description"}</p>
            <button onClick={() => setModalMedicine(null)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
