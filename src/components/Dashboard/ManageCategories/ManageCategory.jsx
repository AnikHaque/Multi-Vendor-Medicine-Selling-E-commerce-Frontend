import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ category: "", image: "" });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8800/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories(res.data); // No pagination
    } catch (error) {
      console.error("Failed to fetch categories", error);
      alert("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const openAddModal = () => {
    setForm({ category: "", image: "" });
    setEditId(null);
    setModalOpen(true);
  };

  const openEditModal = (cat) => {
    setForm({ category: cat.category, image: cat.image || "" });
    setEditId(cat._id);
    setModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure to delete this category?")) return;
    try {
      await axios.delete(`http://localhost:8800/api/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      alert("Category deleted");
      fetchCategories();
    } catch (error) {
      console.error("Delete failed", error);
      alert("Failed to delete category");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.category.trim()) {
      alert("Category name is required");
      return;
    }
    try {
      if (editId) {
        await axios.put(
          `http://localhost:8800/api/categories/${editId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Category updated");
      } else {
        await axios.post("http://localhost:8800/api/categories", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
        alert("Category added");
      }
      setModalOpen(false);
      fetchCategories();
    } catch (error) {
      console.error("Save failed", error);
      alert("Failed to save category");
    }
  };

  return (
    <div className="p-6 mt-20 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Manage Categories</h1>
      <button onClick={openAddModal} className="mb-4 bg-blue-600 text-white px-4 py-2 rounded">
        + Add Category
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2">Category Name</th>
                <th className="px-4 py-2">Medicine Count</th>
                <th className="px-4 py-2">Image</th>
                <th className="px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="border-t">
                  <td className="px-4 py-2">{cat.category}</td>
                  <td className="px-4 py-2">{cat.count || 0}</td>
                  <td className="px-4 py-2">
                    {cat.image ? (
                      <img
                        src={cat.image}
                        alt={cat.category}
                        className="w-16 h-10 object-cover"
                      />
                    ) : (
                      "No image"
                    )}
                  </td>
                  <td className="px-4 py-2 space-x-2">
                    <button onClick={() => openEditModal(cat)} className="text-blue-600">Edit</button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="text-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            className="bg-white p-6 rounded shadow-md min-w-[320px]"
          >
            <h2 className="text-lg font-semibold mb-4">
              {editId ? "Update Category" : "Add Category"}
            </h2>

            <label className="block mb-2">
              Category Name
              <input
                type="text"
                value={form.category}
                onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                required
                className="mt-1 w-full border px-2 py-1 rounded"
              />
            </label>

            <label className="block mb-4">
              Image URL (optional)
              <input
                type="text"
                value={form.image}
                onChange={(e) => setForm((f) => ({ ...f, image: e.target.value }))}
                className="mt-1 w-full border px-2 py-1 rounded"
              />
            </label>

            <div className="flex justify-end space-x-2">
              <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
                Save
              </button>
              <button type="button" onClick={() => setModalOpen(false)} className="text-gray-600">
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
