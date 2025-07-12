import React, { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryCardSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get("http://localhost:8800/api/categories");
        setCategories(Array.isArray(res.data) ? res.data : []);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setCategories([]);
      } finally {
        setLoading(false);
      }
    }

    fetchCategories();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading categories...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">Browse Categories</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {categories.map((cat) => (
          <div
            key={cat._id}
            className="bg-white rounded-2xl shadow-md p-4 transition-transform hover:scale-105"
          >
            <img
              src={cat.image || "https://via.placeholder.com/300x200?text=No+Image"}
              alt={cat.category}
              className="w-full h-40 object-cover rounded-xl mb-4"
            />
            <h2 className="text-xl font-semibold mb-2">{cat.category}</h2>
            <p className="text-gray-600">{cat.count || 0} medicines available</p>
          </div>
        ))}
      </div>
    </div>
  );
}
