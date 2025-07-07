import React, { useState, useEffect } from "react";
import axios from "axios";

export default function CreateMedicinePage() {
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    company: "",
    price: "",
    discount: 0,
    image: "",
    quantity: "",
    description: "",
  });
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    axios.get("https://multi-vendor-medicine-selling-e-com.vercel.app/api/categories").then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "https://multi-vendor-medicine-selling-e-com.vercel.app/api/medicines",
        { 
          name: form.name,
          category: form.category,
          company: form.company,
          price: Number(form.price),
          discount: Number(form.discount),
          image: form.image,
          quantity: Number(form.quantity),
          description: form.description,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setMessage("Medicine created successfully");
      setForm({
        name: "",
        category: "",
        company: "",
        price: "",
        discount: 0,
        image: "",
        quantity: "",
        description: "",
      });
    } catch (error) {
      setMessage(error.response?.data?.message || "Error creating medicine");
    }
  };

  return (
    <div className="mt-20">
<form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: "auto" }}>
      <h2>Create Medicine</h2>
      <input
        type="text"
        placeholder="Medicine Name"
        name="name"
        value={form.name}
        onChange={handleChange}
        required
      />
      <select name="category" value={form.category} onChange={handleChange} required>
        <option value="">Select Category</option>
        {categories.map((cat) => (
          <option key={cat.category} value={cat.category}>
            {cat.category}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Company"
        name="company"
        value={form.company}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        placeholder="Price"
        name="price"
        value={form.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        placeholder="Discount (%)"
        name="discount"
        value={form.discount}
        onChange={handleChange}
        min="0"
        max="100"
      />
      <input
        type="text"
        placeholder="Image URL"
        name="image"
        value={form.image}
        onChange={handleChange}
      />
      <input
        type="number"
        placeholder="Quantity"
        name="quantity"
        value={form.quantity}
        onChange={handleChange}
      />
      <textarea
        placeholder="Description"
        name="description"
        value={form.description}
        onChange={handleChange}
      />
      <button type="submit">Create Medicine</button>
      <p>{message}</p>
    </form>
    </div>
    
  );
}
