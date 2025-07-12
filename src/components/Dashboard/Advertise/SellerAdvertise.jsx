import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import Swal from "sweetalert2";

Modal.setAppElement("#root");

export default function SellerAdvertisementSection() {
  const [ads, setAds] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState({ medicineId: "", image: "", description: "" });
  const [myMedicines, setMyMedicines] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchAds();
    fetchMyMedicines();
  }, []);

  const fetchAds = async () => {
    const res = await axios.get("http://localhost:8800/api/advertise/mine", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setAds(res.data);
  };

  const fetchMyMedicines = async () => {
    const res = await axios.get("http://localhost:8800/api/my-medicines", {
      headers: { Authorization: `Bearer ${token}` },
    });
    setMyMedicines(res.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/api/advertise", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      Swal.fire("Submitted", "Advertisement request sent", "success");
      setIsModalOpen(false);
      setForm({ medicineId: "", image: "", description: "" });
      fetchAds();
    } catch {
      Swal.fire("Error", "Failed to submit advertisement", "error");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Ask for Advertisement</h2>
      <button onClick={() => setIsModalOpen(true)} className="mb-4 bg-blue-600 text-white px-4 py-2 rounded">
        + Add Advertisement
      </button>

      <table className="w-full text-sm border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Status</th>
            <th className="p-2 border">Submitted On</th>
          </tr>
        </thead>
        <tbody>
          {ads.map((ad) => (
            <tr key={ad._id}>
              <td className="p-2 border">
                <img src={ad.image} alt="ad" className="w-24 h-16 object-cover rounded" />
              </td>
              <td className="p-2 border">{ad.description}</td>
              <td className="p-2 border">
                {ad.approved ? (
                  <span className="text-green-600 font-semibold">Approved</span>
                ) : (
                  <span className="text-yellow-600">Pending</span>
                )}
              </td>
              <td className="p-2 border">{new Date(ad.createdAt).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        className="bg-white p-6 rounded shadow max-w-md mx-auto mt-20"
        overlayClassName="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center"
      >
        <h3 className="text-lg font-semibold mb-4">Submit Advertisement</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <select
            name="medicineId"
            required
            value={form.medicineId}
            onChange={(e) => setForm({ ...form, medicineId: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Medicine</option>
            {myMedicines.map((med) => (
              <option key={med._id} value={med._id}>
                {med.name}
              </option>
            ))}
          </select>
          <input
            name="image"
            type="text"
            placeholder="Image URL"
            required
            value={form.image}
            onChange={(e) => setForm({ ...form, image: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          />
          <textarea
            name="description"
            placeholder="Short Description"
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full border px-3 py-2 rounded"
          ></textarea>
          <div className="flex justify-end gap-2">
            <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded">
              Submit
            </button>
            <button onClick={() => setIsModalOpen(false)} className="bg-gray-400 text-white px-4 py-2 rounded">
              Cancel
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
