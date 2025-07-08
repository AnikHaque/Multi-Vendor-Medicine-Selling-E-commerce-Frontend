import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const slides = [
  {
    id: 1,
    image: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/10/slider1-layer3.png",
    title: "Combo Covid-19 Prevention & Control",
    desc: "Work with talented people at the most affordable price to get the most out of your time and cost.Work with talented people at the most affordable price to get the most out of your time and cost",
    btn1: "Subscribe Now",
    btn2: "Learn More",
  },
  {
    id: 2,
    image: "https://png.pngtree.com/thumb_back/fh260/background/20220427/pngtree-home-office-banner-freelance-work-image_1091574.jpg",
    title: "The Easiest Way to Get Your New Job",
    desc: "Work with talented people at the most affordable price to get the most out of your time and cost",
    btn1: "Explore",
    btn2: "Subscribe",
  },
  {
    id: 3,
    image: "https://cdn.vectorstock.com/i/1000v/40/06/futuristic-devops-process-banner-vector-41714006.jpg",
    title: "Essential Security Kits",
    desc: "Gear up for your next outdoor devops in style.",
    btn1: "Get Subscription",
    btn2: "See Tips",
  },
];

const Hero = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    // autoplay: true,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div className="py-28 md:py-32 overflow-hidden bg-blue-500">
      <Slider {...settings}>
        {slides.map((slide) => (
          <div key={slide.id}>
            <div className="grid grid-cols-1 md:grid-cols-2 items-center rounded-lg shadow-md max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 gap-6">
              {/* Left: Text */}
              <div className="text-center md:text-left">
                <h2 className="text-2xl md:text-5xl font-bold text-white mb-4">{slide.title}</h2>
                <p className="text-gray-600 mb-6">{slide.desc}</p>
                <div className="flex justify-center md:justify-start gap-4 flex-wrap">
                  <button className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 transition">
                    {slide.btn1}
                  </button>
                  <button className="bg-gray-200 text-gray-800 px-5 py-2 rounded hover:bg-gray-300 transition">
                    {slide.btn2}
                  </button>
                </div>
              </div>

              {/* Right: Image */}
              <div>
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="h-64 md:h-[500px] w-full object-cover rounded"
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
