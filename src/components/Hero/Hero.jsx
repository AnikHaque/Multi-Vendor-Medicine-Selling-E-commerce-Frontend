import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Hero = () => {
  const [slides, setSlides] = useState([]);

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const res = await axios.get("http://localhost:8800/api/medicines/banner");
        setSlides(res.data);
      } catch (err) {
        console.error("Failed to load banner medicines", err);
      }
    };

    fetchSlides();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
  };

  return (
    <div className="py-28 md:py-32 overflow-hidden bg-[#5dbfc8]">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide._id}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center rounded-lg shadow-md max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-6">
              {/* Left: Text */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-4">{slide.name}</h2>
                <p className="text-gray-100 mb-6">{slide.description || "No description available."}</p>
                <div className="flex justify-center md:justify-start gap-4 flex-wrap">
                  <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
                    Order Now
                  </button>
                  <button className="bg-white text-blue-700 px-5 py-2 rounded hover:bg-gray-100 transition">
                    Learn More
                  </button>
                </div>
              </div>

              {/* Right: Image */}
              <div>
                <img
                  src={slide.image || "https://via.placeholder.com/500x400?text=No+Image"}
                  alt={slide.name}
                  className="h-64 md:h-[500px] w-full md:ml-20 object-cover rounded"
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Hero;
