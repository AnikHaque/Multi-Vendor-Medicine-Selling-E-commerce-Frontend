import ProductCard from "../Shared/ProductCard";


const products = [
  { title: 'Infrared Thermometer', price: 130, image: '/thermo.png' },
  { title: 'Fish Oil Omega 3', price: 99, originalPrice: 100, image: '/omega3.png' },
  { title: 'AiroEze Nebuliser', price: 92, rating: 5, image: '/nebulizer.png' },
  // More...
];

const CovidDefense = () => (
  <section className="my-10 px-4">
    <h2 className="text-2xl font-bold mb-4">COVID-19 Self-Defense</h2>
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((p, i) => (
        <ProductCard key={i} {...p} />
      ))}
    </div>
  </section>
);

export default CovidDefense;
