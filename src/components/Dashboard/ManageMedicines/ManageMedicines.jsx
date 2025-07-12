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
    const res = await axios.get("http://localhost:8800/api/my-medicines", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMedicines(res.data);
  };

  const fetchCategories = async () => {
    const res = await axios.get("http://localhost:8800/api/categories");
    setCategories(res.data);
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
      await axios.post("http://localhost:8800/api/medicines", form, {
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
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Manage My Medicines</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded"
      >
        + Add Medicine
      </button>

      <table className="w-full border">
        <thead>
          <tr>
            <th>Name</th>
            <th>Generic</th>
            <th>Category</th>
            <th>Company</th>
            <th>Unit</th>
            <th>Price</th>
            <th>Discount %</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med._id} className="text-center border-t">
              <td>{med.name}</td>
              <td>{med.genericName}</td>
              <td>{med.category}</td>
              <td>{med.company}</td>
              <td>{med.unit}</td>
              <td>${med.price}</td>
              <td>{med.discount || 0}%</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add Medicine Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Medicine"
        className="bg-white p-6 rounded shadow max-w-md mx-auto mt-24"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center"
      >
        <h3 className="text-lg font-semibold mb-4">Add New Medicine</h3>

        <div className="space-y-3">
          <input name="name" placeholder="Item Name" value={form.name} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="genericName" placeholder="Generic Name" value={form.genericName} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="description" placeholder="Short Description" value={form.description} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="image" placeholder="Image URL" value={form.image} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <select name="category" value={form.category} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.category}>{cat.category}</option>
            ))}
          </select>
          <input name="company" placeholder="Company" value={form.company} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <select name="unit" value={form.unit} onChange={handleChange} className="w-full border px-3 py-2 rounded">
            <option value="mg">MG</option>
            <option value="ml">ML</option>
          </select>
          <input name="price" type="number" placeholder="Per Unit Price" value={form.price} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
          <input name="discount" type="number" placeholder="Discount %" value={form.discount} onChange={handleChange} className="w-full border px-3 py-2 rounded" />
        </div>

        <div className="mt-4 flex justify-end gap-2">
          <button onClick={handleSubmit} className="bg-green-600 text-white px-4 py-2 rounded">Add</button>
          <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded">Cancel</button>
        </div>
      </Modal>
    </div>
  );
}
