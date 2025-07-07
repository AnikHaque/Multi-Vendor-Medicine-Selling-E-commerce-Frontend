import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export default function CategoryDetails() {
  const { category } = useParams();
  const [medicines, setMedicines] = useState([]);
  const [modalMedicine, setModalMedicine] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`https://multi-vendor-medicine-selling-e-com.vercel.app/api/medicines/category/${category}`)
      .then((res) => res.json())
      .then(setMedicines)
      .catch(console.error);
  }, [category]);

  const handleSelect = async (medicine) => {
    if (!token) {
      alert("You must be logged in to add items to cart.");
      return;
    }

    try {
      await axios.post(
        "https://multi-vendor-medicine-selling-e-com.vercel.app/api/cart",
        { medicineId: medicine._id },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Added to cart!");
    } catch (err) {
      alert("Failed to add to cart");
    }
  };

  return (
    <div
      style={{
        maxWidth: 1100,
        margin: "40px auto",
        marginTop:"150px",
        padding: "0 20px",
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      <h1
        style={{
          marginBottom: 30,
          color: "#34495e",
          fontWeight: "700",
          textTransform: "capitalize",
          fontSize: "2.25rem",
          borderBottom: "2px solid #2980b9",
          paddingBottom: 10,
        }}
      >
        Category: {category}
      </h1>

      <table
        style={{
          width: "100%",
          borderCollapse: "separate",
          borderSpacing: "0 12px",
          boxShadow: "0 2px 12px rgba(0,0,0,0.1)",
          backgroundColor: "#fff",
          borderRadius: 12,
          overflow: "hidden",
        }}
      >
        <thead>
          <tr style={{ backgroundColor: "#2980b9", color: "#fff" }}>
            {["Name", "Company", "Price", "Discount", "Actions"].map((text) => (
              <th
                key={text}
                style={{
                  padding: "14px 20px",
                  fontWeight: "600",
                  fontSize: 16,
                  textAlign: "left",
                }}
              >
                {text}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {medicines.length === 0 && (
            <tr>
              <td
                colSpan="5"
                style={{
                  textAlign: "center",
                  padding: "30px 0",
                  color: "#7f8c8d",
                  fontStyle: "italic",
                  fontSize: 16,
                }}
              >
                No medicines found.
              </td>
            </tr>
          )}

          {medicines.map((med) => (
            <tr
              key={med._id}
              style={{
                backgroundColor: "#f9f9f9",
                boxShadow: "0 0 8px rgba(0,0,0,0.03)",
                borderRadius: 8,
              }}
            >
              <td style={{ padding: "15px 20px", fontWeight: "600", fontSize: 16 }}>
                {med.name}
              </td>
              <td style={{ padding: "15px 20px", color: "#555" }}>{med.company}</td>
              <td style={{ padding: "15px 20px", fontWeight: "600" }}>${med.price}</td>
              <td style={{ padding: "15px 20px", color: "#27ae60", fontWeight: "700" }}>
                {med.discount}%
              </td>
              <td style={{ padding: "15px 20px" }}>
                <button
                  onClick={() => setModalMedicine(med)}
                  style={{
                    marginRight: 10,
                    backgroundColor: "#3498db",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
                  aria-label={`View details of ${med.name}`}
                  title="View Details"
                >
                  👁️
                </button>
                <button
                  onClick={() => handleSelect(med)}
                  style={{
                    backgroundColor: "#27ae60",
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    padding: "8px 12px",
                    cursor: "pointer",
                    fontWeight: "600",
                    transition: "background-color 0.2s ease",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#219150")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#27ae60")}
                  aria-label={`Add ${med.name} to cart`}
                  title="Add to Cart"
                >
                  🛒 Select
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {modalMedicine && (
        <div
          onClick={() => setModalMedicine(null)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
            padding: 20,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              backgroundColor: "#fff",
              borderRadius: 12,
              maxWidth: 500,
              width: "100%",
              maxHeight: "90vh",
              overflowY: "auto",
              padding: 30,
              boxShadow: "0 10px 40px rgba(0,0,0,0.15)",
              fontSize: 16,
              color: "#2c3e50",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                marginBottom: 20,
                fontWeight: "700",
                fontSize: "1.8rem",
                textTransform: "capitalize",
                color: "#34495e",
              }}
            >
              {modalMedicine.name}
            </h2>
            <img
              src={modalMedicine.image || "/default-medicine.png"}
              alt={modalMedicine.name}
              style={{
                width: "100%",
                maxHeight: 280,
                objectFit: "contain",
                marginBottom: 20,
                borderRadius: 8,
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            />
            <p>
              <strong>Company:</strong> {modalMedicine.company}
            </p>
            <p>
              <strong>Price:</strong> ${modalMedicine.price}
            </p>
            <p>
              <strong>Discount:</strong> {modalMedicine.discount}%
            </p>
            <p>
              <strong>Quantity Available:</strong>{" "}
              {modalMedicine.quantity ?? "N/A"}
            </p>
            <p style={{ marginTop: 12 }}>
              <strong>Description:</strong>{" "}
              {modalMedicine.description || "No description available."}
            </p>
            <div style={{ textAlign: "right", marginTop: 24 }}>
              <button
                onClick={() => setModalMedicine(null)}
                style={{
                  padding: "10px 20px",
                  border: "none",
                  backgroundColor: "#e74c3c",
                  color: "#fff",
                  borderRadius: 6,
                  cursor: "pointer",
                  fontWeight: "600",
                  transition: "background-color 0.2s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#c0392b")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#e74c3c")
                }
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
