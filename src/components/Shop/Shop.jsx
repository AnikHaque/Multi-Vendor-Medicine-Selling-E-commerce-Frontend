import React, { useEffect, useState } from "react";
import axios from "axios";

export default function AllMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [addingToCartId, setAddingToCartId] = useState(null);

  const token = localStorage.getItem("token");

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

  const handleAddToCart = async (medicineId) => {
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }
    try {
      setAddingToCartId(medicineId);
      await axios.post(
        "http://localhost:8800/api/cart",
        { medicineId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Added to cart!");
    } catch (error) {
      console.error("Failed to add to cart:", error);
      alert("Failed to add to cart");
    } finally {
      setAddingToCartId(null);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading medicines...</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">All Medicines</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicines.map((med) => (
          <div key={med._id} className="bg-white rounded-xl shadow-md p-4 flex flex-col">
            <img
              src={med.image || "https://via.placeholder.com/300x200?text=No+Image"}
              alt={med.name}
              className="w-full h-40 object-cover rounded-md mb-3"
            />
            <h2 className="text-lg font-semibold">{med.name}</h2>
            <p className="text-gray-600 mb-1">{med.company}</p>
            <p className="text-gray-800 font-bold mb-2">${med.price}</p>
            <button
              onClick={() => handleAddToCart(med._id)}
              disabled={addingToCartId === med._id}
              className="mt-auto bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {addingToCartId === med._id ? "Adding..." : "Add to Cart"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
