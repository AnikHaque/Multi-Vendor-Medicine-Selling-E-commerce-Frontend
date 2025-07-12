import React, { useEffect, useState } from "react";
import axios from "axios";

export default function MedicinesTable() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const token = localStorage.getItem("token");

  // Fetch all medicines
  useEffect(() => {
    async function fetchMedicines() {
      try {
        const res = await axios.get("http://localhost:8800/api/medicines");
        setMedicines(res.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMedicines();
  }, []);

  // Add medicine to cart
  const handleSelect = async (medicineId) => {
    if (!token) {
      alert("Please login first.");
      return;
    }
    try {
      await axios.post(
        "http://localhost:8800/api/cart",
        { medicineId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Medicine added to cart!");
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert("Failed to add medicine to cart");
    }
  };

  // Open modal with medicine info
  const handleView = (medicine) => {
    setSelectedMedicine(medicine);
    setModalOpen(true);
  };

  if (loading) return <p className="text-center mt-10">Loading medicines...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Medicines</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">Name</th>
              <th className="border px-4 py-2 text-left">Category</th>
              <th className="border px-4 py-2 text-left">Company</th>
              <th className="border px-4 py-2 text-left">Price</th>
              <th className="border px-4 py-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {medicines.map((med) => (
              <tr key={med._id} className="border-t">
                <td className="border px-4 py-2">{med.name}</td>
                <td className="border px-4 py-2">{med.category}</td>
                <td className="border px-4 py-2">{med.company}</td>
                <td className="border px-4 py-2">${med.price}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleSelect(med._id)}
                    className="bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                  >
                    Select
                  </button>
                  <button
                    onClick={() => handleView(med)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    Eye
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {modalOpen && selectedMedicine && (
        <div
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-lg shadow-lg max-w-lg w-full p-6 relative"
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-2 right-2 text-gray-600 hover:text-gray-900 font-bold text-xl"
            >
              &times;
            </button>
            <img
              src={selectedMedicine.image || "https://via.placeholder.com/400x250?text=No+Image"}
              alt={selectedMedicine.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{selectedMedicine.name}</h2>
            <p><strong>Category:</strong> {selectedMedicine.category}</p>
            <p><strong>Company:</strong> {selectedMedicine.company}</p>
            <p><strong>Generic Name:</strong> {selectedMedicine.genericName || "N/A"}</p>
            <p><strong>Description:</strong> {selectedMedicine.description || "No description provided."}</p>
            <p><strong>Unit:</strong> {selectedMedicine.unit}</p>
            <p><strong>Price:</strong> ${selectedMedicine.price}</p>
            <p><strong>Discount:</strong> {selectedMedicine.discount || 0}%</p>
          </div>
        </div>
      )}
    </div>
  );
}
