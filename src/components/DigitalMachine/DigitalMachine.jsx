import React from 'react';

const DigitalMachines = [
  {
    title: "Digital Wrist Blood Pressure Monitor",
    image: "https://wordpressthemes.live/WCG10/WCM230_healthmart/medicine02/wp-content/uploads/2025/02/CMS-banner-01.jpg",
  },
  {
    title: "Digital X-ray system in High Frequency",
    image: "https://wordpressthemes.live/WCG10/WCM230_healthmart/medicine02/wp-content/uploads/2025/02/CMS-banner-02.jpg",
  },
 
];

const DigitalMachine = () => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {DigitalMachines.map((promo, index) => (
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

export default DigitalMachine;
