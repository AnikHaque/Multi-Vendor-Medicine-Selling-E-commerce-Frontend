import React, { useState, useEffect } from "react";
import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

export default function ManageMedicines() {
  const [medicines, setMedicines] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    genericName: "",
    description: "",
    image: "",
    category: "",
    company: "",
    unit: "mg",
    price: "",
    discount: 0,
  });

  const token = localStorage.getItem("token");

  const fetchMedicines = async () => {
    try {
      const res = await axios.get("https://multi-vendor-medicine-selling-e-com.vercel.app/api/my-medicines", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedicines(res.data);
    } catch (err) {
      console.error("Failed to fetch medicines", err);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await axios.get("https://multi-vendor-medicine-selling-e-com.vercel.app/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories", err);
    }
  };

  useEffect(() => {
    fetchMedicines();
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      await axios.post("https://multi-vendor-medicine-selling-e-com.vercel.app/api/medicines", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Success", "Medicine added", "success");
      setIsModalOpen(false);
      fetchMedicines();
      setForm({
        name: "",
        genericName: "",
        description: "",
        image: "",
        category: "",
        company: "",
        unit: "mg",
        price: "",
        discount: 0,
      });
    } catch (err) {
      Swal.fire("Error", "Failed to add medicine", "error");
    }
  };

  return (
    <div className="p-6 mt-20 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold">💊 Manage My Medicines</h2>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
        >
          + Add Medicine
        </button>
      </div>

      <div className="overflow-x-auto shadow rounded-xl bg-white">
        <table className="min-w-full table-auto text-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
            <tr>
              <th className="px-4 py-3 text-left">Name</th>
              <th className="px-4 py-3 text-left">Generic</th>
              <th className="px-4 py-3 text-left">Category</th>
              <th className="px-4 py-3 text-left">Company</th>
              <th className="px-4 py-3 text-left">Unit</th>
              <th className="px-4 py-3 text-left">Price ($)</th>
              <th className="px-4 py-3 text-left">Discount (%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {medicines.map((med) => (
              <tr key={med._id} className="hover:bg-gray-50">
                <td className="px-4 py-3">{med.name}</td>
                <td className="px-4 py-3">{med.genericName}</td>
                <td className="px-4 py-3">{med.category}</td>
                <td className="px-4 py-3">{med.company}</td>
                <td className="px-4 py-3">{med.unit}</td>
                <td className="px-4 py-3">${med.price}</td>
                <td className="px-4 py-3">{med.discount || 0}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Medicine Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Medicine"
        className="bg-white max-w-lg mx-auto mt-24 p-8 rounded-lg shadow-lg relative"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <h3 className="text-xl font-bold mb-4">Add New Medicine</h3>

        <div className="space-y-4">
          <input
            name="name"
            placeholder="Medicine Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            name="genericName"
            placeholder="Generic Name"
            value={form.genericName}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            name="description"
            placeholder="Short Description"
            value={form.description}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            name="image"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.category}>
                {cat.category}
              </option>
            ))}
          </select>
          <input
            name="company"
            placeholder="Company Name"
            value={form.company}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <select
            name="unit"
            value={form.unit}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          >
            <option value="mg">MG</option>
            <option value="ml">ML</option>
          </select>
          <input
            name="price"
            type="number"
            placeholder="Price Per Unit ($)"
            value={form.price}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
          <input
            name="discount"
            type="number"
            placeholder="Discount (%)"
            value={form.discount}
            onChange={handleChange}
            className="w-full border px-4 py-2 rounded-lg"
          />
        </div>

        <div className="flex justify-end space-x-3 mt-6">
          <button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg"
          >
            Add Medicine
          </button>
          <button
            onClick={() => setIsModalOpen(false)}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded-lg"
          >
            Cancel
          </button>
        </div>
      </Modal>
    </div>
  );
}
