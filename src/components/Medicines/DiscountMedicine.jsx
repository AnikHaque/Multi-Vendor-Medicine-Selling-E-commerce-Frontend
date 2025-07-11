import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import axios from "axios";

const DiscountMedicine = () => {
  const [discounted, setDiscounted] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8800/api/discount-medicines").then((res) => {
      setDiscounted(res.data);
    });
  }, []);

  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-4">Discounted Medicines</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {discounted.map((med) => (
          <SwiperSlide key={med._id}>
            <div className="border p-4 rounded shadow hover:shadow-lg">
              <img src={med.image} alt={med.name} className="h-32 w-full object-cover rounded" />
              <h3 className="text-lg font-semibold mt-2">{med.name}</h3>
              <p className="text-sm text-gray-600">{med.company}</p>
              <p className="text-red-600 font-bold">
                ৳{med.price - (med.price * med.discount) / 100}{" "}
                <span className="line-through text-gray-500">৳{med.price}</span>
              </p>
              <p className="text-sm text-green-500">{med.discount}% off</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountMedicine;
