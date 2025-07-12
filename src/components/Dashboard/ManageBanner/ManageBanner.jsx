import React, { useEffect, useState } from "react";
import axios from "axios";
import Switch from "react-switch"; // Optional toggle package

export default function ManageBannerAdvertise() {
  const [medicines, setMedicines] = useState([]);
  const token = localStorage.getItem("token");

  const fetchMedicines = async () => {
    try {
      const res = await axios.get("http://localhost:8800/api/medicines", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setMedicines(res.data);
    } catch (err) {
      console.error("Error fetching medicines", err);
    }
  };

  const toggleBanner = async (id) => {
    try {
      await axios.put(`http://localhost:8800/api/medicines/${id}/toggle-banner`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchMedicines();
    } catch (err) {
      console.error("Error updating banner status", err);
    }
  };

  useEffect(() => {
    fetchMedicines();
  }, []);

  return (
    <div className="max-w-7xl mx-auto p-6 mt-24">
      <h2 className="text-3xl font-bold mb-6">🎯 Manage Banner Advertise</h2>
      <table className="w-full border border-gray-200 text-sm">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border">Image</th>
            <th className="p-3 border">Name</th>
            <th className="p-3 border">Description</th>
            <th className="p-3 border">Seller Email</th>
            <th className="p-3 border">Banner Status</th>
          </tr>
        </thead>
        <tbody>
          {medicines.map((med) => (
            <tr key={med._id} className="border-t hover:bg-gray-50">
              <td className="p-2">
                <img src={med.image} alt={med.name} className="w-20 h-12 object-cover rounded" />
              </td>
              <td className="p-2">{med.name}</td>
              <td className="p-2 text-gray-600">{med.description}</td>
              <td className="p-2">{med.sellerEmail}</td>
              <td className="p-2">
                <Switch
                  onChange={() => toggleBanner(med._id)}
                  checked={med.isBanner}
                  onColor="#4F46E5"
                  uncheckedIcon={false}
                  checkedIcon={false}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
