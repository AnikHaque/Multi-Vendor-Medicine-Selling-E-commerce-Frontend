import React from 'react';

const promotions = [
  {
    title: "Personal Care  Suppliments",
    image: "https://wordpressthemes.live/WCG10/WCM230_healthmart/medicine02/wp-content/uploads/2025/02/CMS-banner-03.jpg",
  },
  {
    title: "Boost Your Immune System",
    image: "https://wordpressthemes.live/WCG10/WCM230_healthmart/medicine02/wp-content/uploads/2025/02/CMS-banner-04.jpg",
  },
  {
    title: "25% OFF On Select Health Products",
    image: "https://wordpressthemes.live/WCG10/WCM230_healthmart/medicine02/wp-content/uploads/2025/02/CMS-banner-05.jpg",
  },
];

const PromoSection = () => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {promotions.map((promo, index) => (
          <div
            key={index}
            className="relative rounded-lg h-64 overflow-hidden text-white shadow-lg flex flex-col justify-between p-5"
            style={{
              backgroundImage: `url(${promo.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Optional Overlay */}
            <div className="absolute inset-0 bg-black/40 z-0"></div>

            <div className="relative z-10">
              <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full inline-block mb-3">
                NEW
              </span>
              <h2 className="text-xl font-semibold ">{promo.title}</h2>
            </div>

            <button className="relative z-10 bg-white text-blue-900 font-semibold px-4 py-2 rounded-full hover:bg-gray-100 w-fit">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoSection;
