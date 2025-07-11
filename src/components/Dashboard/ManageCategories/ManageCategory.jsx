import React, { useEffect, useState } from "react";
import axios from "axios";

export default function ManageCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState({ category: "", image: "" });
  const [editId, setEditId] = useState(null);

  const token = localStorage.getItem("token");

  // Fetch categories with medicine count
  const fetchCategories = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8800/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setCategories(res.data);
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
        // Update
        await axios.put(
          `http://localhost:8800/api/categories/${editId}`,
          form,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        alert("Category updated");
      } else {
        // Create
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

  if (loading) return <p>Loading categories...</p>;

  return (
    <div style={{ padding: 20 }}>
      <h1>Manage Categories</h1>
      <button onClick={openAddModal} style={{ marginBottom: 20 }}>
        + Add Category
      </button>

      <table border="1" cellPadding="10" cellSpacing="0" width="100%">
        <thead>
          <tr>
            <th>Category Name</th>
            <th>Medicine Count</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.length === 0 && (
            <tr>
              <td colSpan="4" style={{ textAlign: "center" }}>
                No categories found.
              </td>
            </tr>
          )}
          {categories.map((cat) => (
            <tr key={cat._id}>
              <td>{cat.category}</td>
              <td>{cat.count}</td>
              <td>
                {cat.image ? (
                  <img
                    src={cat.image}
                    alt={cat.category}
                    style={{ width: 60, height: 40, objectFit: "cover" }}
                  />
                ) : (
                  "No image"
                )}
              </td>
              <td>
                <button onClick={() => openEditModal(cat)}>Edit</button>{" "}
                <button
                  onClick={() => handleDelete(cat._id)}
                  style={{ color: "red" }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      {modalOpen && (
        <div
          onClick={() => setModalOpen(false)}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
          }}
        >
          <form
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
            style={{
              backgroundColor: "#fff",
              padding: 20,
              borderRadius: 8,
              minWidth: 320,
            }}
          >
            <h2>{editId ? "Update Category" : "Add Category"}</h2>

            <div style={{ marginBottom: 10 }}>
              <label>
                Category Name <br />
                <input
                  type="text"
                  value={form.category}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, category: e.target.value }))
                  }
                  required
                  style={{ width: "100%" }}
                />
              </label>
            </div>

            <div style={{ marginBottom: 10 }}>
              <label>
                Image URL <br />
                <input
                  type="text"
                  value={form.image}
                  onChange={(e) =>
                    setForm((f) => ({ ...f, image: e.target.value }))
                  }
                  placeholder="Optional"
                  style={{ width: "100%" }}
                />
              </label>
            </div>

            <button type="submit" style={{ marginRight: 10 }}>
              Save
            </button>
            <button type="button" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
