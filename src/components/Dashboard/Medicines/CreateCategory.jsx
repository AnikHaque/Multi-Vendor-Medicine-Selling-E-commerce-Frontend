import React, { useState } from "react";
import axios from "axios";

export default function CreateCategory() {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");
  const [isError, setIsError] = useState(false);

  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      await axios.post(
        "https://multi-vendor-medicine-selling-e-com.vercel.app/api/categories",
        { category, image },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setMessage("✅ Category created successfully.");
      setIsError(false);
      setCategory("");
      setImage("");
    } catch (error) {
      setIsError(true);
      setMessage(error.response?.data?.message || "❌ Error creating category.");
    }
  };

  return (
    <div className="mt-20 flex justify-center items-center px-4 ">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-md w-full max-w-md p-6"
      >
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Create Category</h2>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category Name
          </label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="e.g., Painkiller"
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Image URL (optional)
          </label>
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring focus:border-blue-300"
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Create Category
        </button>

        {message && (
          <p className={`mt-4 text-sm ${isError ? "text-red-600" : "text-green-600"}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
