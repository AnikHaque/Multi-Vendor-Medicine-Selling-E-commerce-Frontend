import React, { useEffect, useState } from "react";
import axios from "axios";

// Translation dictionary for English (en) and Bengali (bn)
const translations = {
  en: {
    title: "All Medicines",
    loading: "Loading medicines...",
    name: "Name",
    category: "Category",
    company: "Company",
    price: "Price",
    actions: "Actions",
    select: "Select",
    view: "Eye",
    medicineAdded: "Medicine added to cart!",
    loginPrompt: "Please login first.",
    addFailed: "Failed to add medicine to cart",
    modal: {
      category: "Category",
      company: "Company",
      genericName: "Generic Name",
      description: "Description",
      unit: "Unit",
      price: "Price",
      discount: "Discount",
      noDescription: "No description provided.",
      noImage: "No Image",
      close: "Close",
    },
  },
  bn: {
    title: "সব ঔষধ",
    loading: "ঔষধগুলি লোড হচ্ছে...",
    name: "নাম",
    category: "বিভাগ",
    company: "কোম্পানি",
    price: "মূল্য",
    actions: "কার্য",
    select: "নির্বাচন",
    view: "দেখুন",
    medicineAdded: "ঔষধ কার্টে যোগ হয়েছে!",
    loginPrompt: "দয়া করে প্রথমে লগইন করুন।",
    addFailed: "ঔষধ কার্টে যোগ করা যায়নি",
    modal: {
      category: "বিভাগ",
      company: "কোম্পানি",
      genericName: "জেনেরিক নাম",
      description: "বিবরণ",
      unit: "ইউনিট",
      price: "মূল্য",
      discount: "ডিসকাউন্ট",
      noDescription: "কোনো বিবরণ নেই।",
      noImage: "কোন ছবি নেই",
      close: "বন্ধ করুন",
    },
  },
};

export default function MedicinesTable() {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMedicine, setSelectedMedicine] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [lang, setLang] = useState("en"); // language state: 'en' or 'bn'
  const token = localStorage.getItem("token");

  useEffect(() => {
    async function fetchMedicines() {
      try {
        const res = await axios.get("https://multi-vendor-medicine-selling-e-com.vercel.app/api/medicines");
        setMedicines(res.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchMedicines();
  }, []);

  const t = translations[lang]; // current language translations

  const handleSelect = async (medicineId) => {
    if (!token) {
      alert(t.loginPrompt);
      return;
    }
    try {
      await axios.post(
        "https://multi-vendor-medicine-selling-e-com.vercel.app/api/cart",
        { medicineId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(t.medicineAdded);
    } catch (error) {
      console.error("Error adding to cart:", error);
      alert(t.addFailed);
    }
  };

  const handleView = (medicine) => {
    setSelectedMedicine(medicine);
    setModalOpen(true);
  };

  if (loading) return <p className="text-center mt-10">{t.loading}</p>;

  return (
    <div className="p-6 max-w-7xl mx-auto mt-32">
      {/* Language Selector */}
      <div className="mb-4 text-right">
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="border px-2 py-1 rounded"
          aria-label="Select language"
        >
          <option value="en">English</option>
          <option value="bn">বাংলা</option>
        </select>
      </div>

      <h1 className="text-3xl font-bold mb-6">{t.title}</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-300">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-4 py-2 text-left">{t.name}</th>
              <th className="border px-4 py-2 text-left">{t.category}</th>
              <th className="border px-4 py-2 text-left">{t.company}</th>
              <th className="border px-4 py-2 text-left">{t.price}</th>
              <th className="border px-4 py-2 text-left">{t.actions}</th>
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
                    {t.select}
                  </button>
                  <button
                    onClick={() => handleView(med)}
                    className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700"
                  >
                    {t.view}
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
              aria-label={t.modal.close}
            >
              &times;
            </button>
            <img
              src={selectedMedicine.image || "https://via.placeholder.com/400x250?text=" + encodeURIComponent(t.modal.noImage)}
              alt={selectedMedicine.name}
              className="w-full h-48 object-cover rounded mb-4"
            />
            <h2 className="text-2xl font-semibold mb-2">{selectedMedicine.name}</h2>
            <p>
              <strong>{t.modal.category}:</strong> {selectedMedicine.category}
            </p>
            <p>
              <strong>{t.modal.company}:</strong> {selectedMedicine.company}
            </p>
            <p>
              <strong>{t.modal.genericName}:</strong> {selectedMedicine.genericName || "N/A"}
            </p>
            <p>
              <strong>{t.modal.description}:</strong>{" "}
              {selectedMedicine.description || t.modal.noDescription}
            </p>
            <p>
              <strong>{t.modal.unit}:</strong> {selectedMedicine.unit}
            </p>
            <p>
              <strong>{t.modal.price}:</strong> ${selectedMedicine.price}
            </p>
            <p>
              <strong>{t.modal.discount}:</strong> {selectedMedicine.discount || 0}%
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
