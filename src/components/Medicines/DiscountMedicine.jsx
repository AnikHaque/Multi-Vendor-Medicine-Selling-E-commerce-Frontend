import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import { useEffect, useState } from "react";
import axios from "axios";

const DiscountSlider = () => {
  const [discounted, setDiscounted] = useState([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("https://multi-vendor-medicine-selling-e-com.vercel.app/api/medicines");
      const all = res.data;

      // Filter only products with discount > 0 and valid price
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

  return (
    <div className="px-4 my-8">
      <h2 className="text-2xl font-bold mb-4">🔥 Discount Products</h2>
      <Swiper
        modules={[Navigation]}
        navigation
        spaceBetween={20}
        slidesPerView={3}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {discounted.map((med) => (
          <SwiperSlide key={med._id}>
           

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
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default DiscountSlider;
