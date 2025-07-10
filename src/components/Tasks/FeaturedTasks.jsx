import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ServiceCards = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    axios
      .get("https://freelancer-website-server.vercel.app/api/featured")
      .then((res) => setTasks(res.data))
      .catch((err) => console.error("Failed to fetch tasks", err));
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <img
          src="https://cdn1.vectorstock.com/i/1000x1000/55/10/hand-fidget-spinner-logo-vector-15555510.jpg"
          className="animate-spin w-28 h-28  p-4 rounded-full"
        ></img>
      </div>
    );
  }

  return (
    <div className=" py-28">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semi-bold text-center text-black mb-8">
          Featured Products
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tasks.slice(0, 6).map((task) => (
            <div class="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96">
  <div class="relative p-2.5 h-96 overflow-hidden rounded-xl bg-clip-border">
    <img
      src="https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2021/06/Product_19.jpg"
      alt="card-image"
      class="h-full w-full object-cover rounded-md"
    />
  </div>
  <div class="p-4">
    <div class="mb-2 flex items-center justify-between">
      <p class="text-slate-800 text-xl font-semibold">
        Apple AirPods
      </p>
      <p class="text-cyan-600 text-xl font-semibold">
        $95.00
      </p>
    </div>
    <p class="text-slate-600 leading-normal font-light">
      With plenty of talk and listen time, voice-activated Siri access, and
      an available wireless charging case.
    </p>
    <button class="rounded-md w-full mt-6 bg-cyan-600 py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-cyan-700 focus:shadow-none active:bg-cyan-700 hover:bg-cyan-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
      Add to Cart
    </button>
  </div>
</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceCards;
