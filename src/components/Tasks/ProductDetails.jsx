import React, { useState } from "react";

export default function ProductPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(
    "https://i.imgur.com/2Vvbh6V.png"
  );

  const images = [
    "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/10/slider1-layer3.png",
    "https://static.vecteezy.com/system/resources/thumbnails/056/363/611/small_2x/collection-of-medical-supplies-on-a-clean-countertop-featuring-bottles-towels-and-tools-photo.jpg",
    "https://i.imgur.com/jzK6voO.png",
    "https://i.imgur.com/T9WGLAp.png",
  ];

  return (
    <div className="py-28 md:py-32 overflow-hidden">
      <div className="max-w-6xl mx-auto bg-white  rounded-lg p-6">
       

        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-black">
          BEURER MEDICAL BLOOD
        </h1>

        <div className="text-sm text-black mb-2">
          Home &raquo; Shop &raquo; Beurer Medical Blood
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Image Section */}
          <div>
            <img
              src={selectedImage}
              alt="Product"
              className="w-full h-[350px] object-contain rounded-md"
            />

            <div className="flex mt-4 gap-4">
              {images.map((img, idx) => (
                <img
                  key={idx}
                  src={img}
                  alt={`Thumb ${idx + 1}`}
                  onClick={() => setSelectedImage(img)}
                  className={`w-20 h-20 object-contain border rounded cursor-pointer ${
                    selectedImage === img ? "ring-2 ring-blue-500" : ""
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Product Details */}
          <div>
            <p className="text-sm text-gray-500 mb-1 uppercase">
              Accessories, Covid Essentials, Devices, Family Care, Health Care, Personal Care, Pharmacy
            </p>

            <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
              Beurer Medical Blood
            </h2>

            <div className="flex items-center mt-2">
              <span className="text-yellow-400 text-sm">★★★★★</span>
              <span className="ml-2 text-sm text-gray-600">(1 customer review)</span>
            </div>

            <p className="mt-4 text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...
            </p>

            <div className="mt-4 text-2xl text-pink-600 font-semibold">$187.00</div>

            {/* Quantity + Actions */}
            <div className="flex items-center mt-6 gap-4">
              <input
                type="number"
                value={quantity}
                min="1"
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="w-16 border border-gray-300 rounded px-2 py-1 text-center"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded transition">
                ADD TO CART
              </button>
              <button className="bg-black hover:bg-gray-800 text-white px-5 py-2 rounded transition">
                BUY NOW
              </button>
            </div>

            {/* Wishlist and Compare */}
            <div className="flex gap-6 mt-4 text-sm text-gray-600 dark:text-gray-300">
              <button className="flex items-center gap-2 hover:text-blue-600">
                🤍 Add to wishlist
              </button>
              <button className="flex items-center gap-2 hover:text-blue-600">
                🧾 Add to Compare
              </button>
            </div>

            {/* Social Links */}
            <div className="flex gap-4 mt-6">
              {["facebook", "twitter", "linkedin", "pinterest", "tumblr"].map((network) => (
                <a
                  key={network}
                  href="#"
                  className="text-white p-2 bg-gray-700 hover:bg-gray-900 rounded"
                >
                  <i className={`fab fa-${network}`}></i>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
