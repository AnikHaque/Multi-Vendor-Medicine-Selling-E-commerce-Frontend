

const promotions = [
  {
    title: "Personal Care Suppliments", 
    image: "/images/personal-care.png", 
    alt: "Personal Care Supplements",
  },
  {
    title: "Boost Your Immune System",
    image: "/images/immune-boost.png",
    alt: "Boost Immune System",
  },
  {
    title: "25% OFF On Select Health Products",
    image: "/images/health-products.png",
    alt: "Health Products",
  },
];

const PromoSection = () => {
  return (
    <div className="p-6 bg-gray-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {promotions.map((promo, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-5 flex flex-col items-start justify-between"
          >
            <span className="text-xs bg-green-600 text-white px-2 py-1 rounded-full mb-3">
              NEW
            </span>
            <h2 className="text-lg font-semibold text-blue-900 mb-4">{promo.title}</h2>
            <button className="mt-auto bg-blue-900 text-white px-4 py-2 rounded-full hover:bg-blue-800">
              Shop Now
            </button>
            <img
              src={promo.image}
              alt={promo.alt}
              className="mt-5 w-full h-40 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PromoSection;
