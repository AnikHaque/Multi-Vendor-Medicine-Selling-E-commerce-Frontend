import React, { useEffect, useState } from "react";
import axios from "axios";

const TopMonthlyMedicines = () => {
  const [topMeds, setTopMeds] = useState([]);

  useEffect(() => {
    const fetchTopMeds = async () => {
      try {
        const res = await axios.get("https://multi-vendor-medicine-selling-e-com.vercel.app/api/medicines/top-monthly");
        setTopMeds(res.data);
      } catch (err) {
        console.error("Error fetching top medicines:", err);
      }
    };

    fetchTopMeds();
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-semibold text-center text-cyan-800 mb-10">
          🔥 Top Medicines of the Month
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {topMeds.map((med) => (
            <div
              key={med._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden border hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={med.image || "/default-medicine.png"}
                alt={med.name}
                className="w-full h-56 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-bold text-gray-800">{med.name}</h3>
                <p className="text-sm text-gray-500 mb-2">{med.company}</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-cyan-700 font-semibold">${med.price}</p>
                  <span className="text-sm text-gray-600">
                    Sold: {med.totalSold}
                  </span>
                </div>
              </div>
            </div>
          ))}
          {topMeds.length === 0 && (
            <p className="col-span-3 text-center text-gray-600">No data available.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TopMonthlyMedicines;
