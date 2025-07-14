import React from 'react';

const vendors = [
  {
    name: 'Shoppe',
    rating: 4,
    products: 6,
    logo: 'https://demo2.pavothemes.com/matico/wp-content/uploads/2022/03/p_hmarketplace_73_1-600x649.jpg', // placeholder
    items: ['https://demo2.pavothemes.com/matico/wp-content/uploads/2022/03/p_hmarketplace_73_1-600x649.jpg', 'https://demo2.pavothemes.com/matico/wp-content/uploads/2022/03/p_hmarketplace_73_1-600x649.jpg']
  },
  {
    name: 'Esthershop',
    rating: 4,
    products: 7,
    logo: '/esther-logo.png',
    items: ['/oil.png']
  },
  {
    name: 'Shoppe',
    rating: 4,
    products: 6,
    logo: '/shoppe-logo.png', // placeholder
    items: ['/bike.png', '/cream.png']
  },
  {
    name: 'Esthershop',
    rating: 4,
    products: 7,
    logo: '/esther-logo.png',
    items: ['/oil.png']
  },
  {
    name: 'Shoppe',
    rating: 4,
    products: 6,
    logo: '/shoppe-logo.png', // placeholder
    items: ['/bike.png', '/cream.png']
  },
  {
    name: 'Esthershop',
    rating: 4,
    products: 7,
    logo: '/esther-logo.png',
    items: ['/oil.png']
  },
  {
    name: 'Shoppe',
    rating: 4,
    products: 6,
    logo: '/shoppe-logo.png', // placeholder
    items: ['/bike.png', '/cream.png']
  },
  {
    name: 'Esthershop',
    rating: 4,
    products: 7,
    logo: '/esther-logo.png',
    items: ['/oil.png']
  },
  // Add other vendors similarly
];

const TopSellingVendors = () => {
  return (
    <section className="my-10 px-4">
      <h2 className="text-2xl font-bold mb-4">Top Selling Vendor</h2>
      <div className="flex gap-6 overflow-x-auto">
        {vendors.map((vendor, idx) => (
          <div key={idx} className="border rounded-lg p-4 min-w-[200px] bg-white shadow-sm">
            <div className="flex gap-2 overflow-x-auto">
              {vendor.items.map((item, i) => (
                <img key={i} src={item} alt="" className="h-16 w-16 object-contain" />
              ))}
            </div>
            <div className="mt-3 font-semibold">{vendor.name}</div>
            <div className="text-sm text-gray-500">{vendor.products} Products</div>
            <div className="text-yellow-500">{"★".repeat(vendor.rating)}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopSellingVendors;
