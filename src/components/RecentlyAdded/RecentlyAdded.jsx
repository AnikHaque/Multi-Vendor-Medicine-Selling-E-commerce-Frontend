
import ProductCard from '../../components/Shared/ProductCard';

const products = [
  {
    title: 'Antibacterial Hand Sanitizer',
    price: 135,
    rating: 5,
    image: '/hand-sanitizer.png'
  },
  {
    title: 'Blood Pressure Monitor',
    price: 187,
    rating: 5,
    image: '/bp-monitor.png'
  },
  // more...
];

const RecentlyAdded = () => (
  <section className="my-10 px-4">
    <h2 className="text-2xl font-bold mb-4">Recently Added</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product, idx) => (
        <ProductCard key={idx} {...product} />
      ))}
    </div>
  </section>
);

export default RecentlyAdded;
