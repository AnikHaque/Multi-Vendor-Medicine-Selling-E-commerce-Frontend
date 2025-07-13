import React from "react";

const hotDeals = [
  {
    id: 1,
    name: "Grow Strong Shampoo – 370mL",
    category: "Personal Care, Stomach Pain",
    price: 250,
    originalPrice: 255,
    discount: "-2%",
    image: "https://demo2.wpthemego.com/themes/sw_mallon/layout2/wp-content/uploads/2021/06/Tea-infused-Natural-Skincare.jpg",
    rating: 5,
    reviews: 1,
  },
  {
    id: 2,
    name: "Health Nurture Fish Oil Omega 3 – 1500mg",
    category: "Personal Care",
    price: 320,
    originalPrice: 325,
    discount: "-2%",
    image: "https://demo2.wpthemego.com/themes/sw_mallon/layout2/wp-content/uploads/2021/06/Electric-Brush-Oral-B-Combo.jpg",
    rating: 0,
    reviews: 0,
  },
  {
    id: 3,
    name: "Herbal Cough Remedy – 100mL",
    category: "Personal Care, Stomach Pain",
    price: 150,
    originalPrice: 156,
    discount: "-4%",
    image: "https://demo2.wpthemego.com/themes/sw_mallon/layout2/wp-content/uploads/2021/06/Combo-Gillette-Mach-3-Classic.jpg",
    rating: 0,
    reviews: 0,
  },
  {
    id: 4,
    name: "Liqid Vitamin B12 – 30ml",
    category: "Migraine & Headache",
    price: 320,
    originalPrice: 324,
    discount: "-1%",
    image: "https://demo2.wpthemego.com/themes/sw_mallon/layout2/wp-content/uploads/2021/06/Combo-Marimer-Baby-Daily-Nasal-Hygiene.jpg",
    rating: 0,
    reviews: 0,
  },
  {
    id: 5,
    name: "Vigorum Forehead And Ear Thermometer",
    category: "Bandages, Gypsum foundations",
    price: 200,
    originalPrice: 256,
    discount: "-22%",
    image: "https://i.ibb.co/ZLJjrpN/vigorum.png",
    rating: 0,
    reviews: 0,
  },
];

const TodayHotDeals = () => {
  return (
    <div className="bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-6">
          <h2 className="text-2xl font-semibold flex items-center gap-2">
            <span className="text-yellow-600 border-l-4 pl-2 border-yellow-500">
              Today’s Hot Deals
            </span>
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            Hot! Voucher deal up to 50%++
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-6">
          {hotDeals.map((item) => (
            <div
              key={item.id}
              className="bg-white p-4 rounded shadow hover:shadow-lg transition"
            >
              {item.discount && (
                <span className="absolute bg-yellow-100 text-yellow-700 text-xs px-2 py-1 rounded top-2 left-2">
                  {item.discount}
                </span>
              )}
              <img
                src={item.image}
                alt={item.name}
                className=""
              />
              <div className="bg-red-50 text-center text-red-500 text-xs p-2 rounded mb-2">
                <span>1692</span> days · <span>05</span> hrs ·{" "}
                <span>17</span> mins · <span>47</span> secs
              </div>
              <p className="text-xs text-gray-500">{item.category}</p>
              <h4 className="text-sm font-semibold">{item.name}</h4>
              <div className="text-sm mt-1">
                <span className="text-red-500 font-bold">${item.price}</span>{" "}
                <span className="line-through text-gray-400">
                  ${item.originalPrice}
                </span>
              </div>
              <div className="text-yellow-400 text-xs mt-1">
                {"★".repeat(item.rating)}
                {"☆".repeat(5 - item.rating)}{" "}
                <span className="text-gray-400"> {item.reviews} Review(s)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TodayHotDeals;
