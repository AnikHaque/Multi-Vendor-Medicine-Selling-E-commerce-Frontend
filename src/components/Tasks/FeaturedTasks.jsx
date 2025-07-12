import React, { useEffect, useState } from "react";
import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const ServiceCards = () => {
  const [discounted, setDiscounted] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:8800/api/medicines");
      const all = res.data;

      const filtered = all
        .filter((m) => m.discount > 0 && m.price > 0)
        .map((m) => ({
          ...m,
          discountedPrice: Math.round(m.price - (m.price * m.discount) / 100),
        }));

      setDiscounted(filtered);
    };

    fetch();
  }, []);

  const handleAddToCart = async (medicineId) => {
    if (!token) {
      alert("You must be logged in to add items to the cart.");
      return;
    }

    try {
      await axios.post(
        "http://localhost:8800/api/cart",
        { medicineId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert("Item added to cart!");
    } catch (err) {
      console.error("Add to cart failed", err);
      alert("Failed to add item to cart.");
    }
  };

  return (
    <div className="py-28 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-12">
          💊 Discounted Products
        </h1>

        <Swiper
          modules={[Navigation]}
          navigation
          spaceBetween={24}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
        >
          {discounted.map((med) => (
            <SwiperSlide key={med._id}>
              <div className="flex flex-col h-full bg-white shadow-md border border-gray-200 rounded-lg overflow-hidden">
                <div className="h-64">
                  <img
                    src={med.image || "/default-medicine.png"}
                    alt={med.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-4 flex flex-col justify-between h-full">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {med.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-2">{med.company}</p>
                    <div className="mb-3">
                      <p className="text-red-600 font-bold text-lg">
                        ${med.discountedPrice}
                        <span className="line-through text-gray-400 text-sm ml-2">
                          ${med.price}
                        </span>
                      </p>
                      <p className="text-green-500 text-xs">
                        Save {med.discount}%
                      </p>
                    </div>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {med.description || "No description available."}
                    </p>
                  </div>
                  <button
                    onClick={() => handleAddToCart(med._id)}
                    className="mt-4 bg-cyan-600 hover:bg-cyan-700 text-white py-2 px-4 rounded-md text-sm transition"
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default ServiceCards;
