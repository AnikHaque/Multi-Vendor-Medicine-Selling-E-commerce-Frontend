import React, { useState } from "react";
import axios from "axios";

export default function CreateCategory() {
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState("");

  const token = localStorage.getItem("token"); // or from context

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8800/api/categories",
        { category, image },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Category created successfully");
      setCategory("");
      setImage("");
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating category");
    }
  };

  return (
    <div className="mt-20">
<form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Create Category</h2>
      <input
        type="text"
        placeholder="Category Name"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Category Image URL"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />
      <button type="submit">Create Category</button>
      <p>{message}</p>
    </form>
    </div>
    
  );
}
