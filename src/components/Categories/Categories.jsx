import React from "react";

export default function MedicineCategorySection() {
  const medicineCategories = [
    {
      id: 1,
      name: "Family Care",
      image: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/11/Category_3.jpg",
      count: 24,
    },
    {
      id: 2,
      name: "Fitness",
      image: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/11/Category_5.jpg",
      count: 18,
    },
    {
      id: 3,
      name: "Personal Care",
      image: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/11/Product_10.jpg",
      count: 12,
    },
    {
      id: 4,
      name: "Pharmacy",
      image: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/11/Product_13.jpg",
      count: 33,
    },
    {
      id: 4,
      name: "Devices",
      image: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/11/Product_19.jpg",
      count: 33,
    },
    {
      id: 4,
      name: "Accessories",
      image: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/11/Product_9.jpg",
      count: 33,
    },
    {
      id: 4,
      name: "Functional Foods",
      image: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/12/functional-food.png",
      count: 33,
    },
  ];

  return (
    <section className="py-12 ">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-semi-bold text-center text-black mb-8">
          Shop By Categories
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {medicineCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
            >
              <img
                src={category.image}
                alt={category.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4 text-center">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">
                  {category.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">
                  {category.count} medicines
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
