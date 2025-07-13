

const products = [
  {
    id: 1,
    name: "Vitamin C With Zinc – 30 Tablets",
    category: "Depression, Personal Care",
    price: 280,
    originalPrice: 317,
    discount: "-12%",
    rating: 1,
    image: "https://demo2.wpthemego.com/themes/sw_mallon/wp-content/uploads/2021/06/100-Whey-Protein.jpg",
  },
  {
    id: 2,
    name: "Vitamin B12 1000mcg",
    category: "Personal Care, Stomach Pain",
    price: 310,
    originalPrice: null,
    discount: null,
    rating: 0,
    image: "https://i.ibb.co/K9RYzVk/b12.png",
  },
  {
    id: 3,
    name: "UX-A-01 Non Contact Infrared Thermometer",
    category: "Depression, Personal Care, Stomach Pain",
    price: 120,
    originalPrice: null,
    discount: null,
    rating: 1,
    image: "https://i.ibb.co/7ktWzTR/ux-thermo.png",
  },
  {
    id: 4,
    name: "Milk Powder – 900g",
    category: "Depression, Personal Care",
    price: 420,
    originalPrice: 425,
    discount: "-1%",
    rating: 0,
    image: "https://i.ibb.co/Jct3ZPy/milk.png",
  },
  {
    id: 5,
    name: "Vitamin C – 20 Effervescent Tablets",
    category: "Personal Care, Stomach Pain",
    price: 180,
    originalPrice: 215,
    discount: "-16%",
    rating: 1,
    image: "https://i.ibb.co/yR0KWZj/effervescent.png",
  },
  {
    id: 6,
    name: "Vigorum Forehead And Ear Thermometer",
    category: "Bandages, Gypsum foundations",
    price: 200,
    originalPrice: 256,
    discount: "-22%",
    rating: 0,
    image: "https://i.ibb.co/ZLJjrpN/vigorum.png",
  },
  {
    id: 7,
    name: "Pack Of 50 Disposable Face Masks",
    category: "Depression, Personal Care",
    price: 108,
    originalPrice: null,
    discount: null,
    rating: 1,
    image: "https://i.ibb.co/jvgp4rs/mask.png",
  },
  {
    id: 8,
    name: "Liqid Vitamin B12 – 30ml",
    category: "Migraine & Headache, Personal Care",
    price: 324,
    originalPrice: null,
    discount: null,
    rating: 0,
    image: "https://i.ibb.co/4J2D5Lk/liquid-b12.png",
  },
];

const HealthcareProducts = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4 py-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Healthcare Products</h2>
        <a href="#" className="text-blue-500 hover:underline text-sm">
          See all
        </a>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {/* Left Banner */}
        <div className="col-span-1">
          <img
            src="https://demo2.wpthemego.com/themes/sw_mallon/wp-content/uploads/2021/06/cat-1.jpg"
            alt="Summer Banner"
            className="rounded-xl shadow-lg w-full object-cover"
          />
        </div>

        {/* Product Cards */}
        <div className="col-span-1 md:col-span-3 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className=" rounded-xl p-3 relative hover:shadow-lg transition"
            >
              {product.discount && (
                <span className="absolute top-2 left-2 bg-blue-100 text-blue-600 text-xs px-2 py-1 rounded">
                  {product.discount}
                </span>
              )}

              <img
  src={product.image}
  alt={product.name}
  className=""
/>

              <p className="text-xs text-gray-500 mb-1">{product.category}</p>
              <h4 className="text-sm font-semibold line-clamp-2">
                {product.name}
              </h4>
              <div className="flex items-center text-sm mt-1">
                <span className="text-teal-600 font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="ml-2 line-through text-gray-400">
                    ${product.originalPrice}
                  </span>
                )}
              </div>
              <div className="text-yellow-400 mt-1 text-xs">
                {"★".repeat(product.rating)}
                {"☆".repeat(5 - product.rating)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HealthcareProducts;
