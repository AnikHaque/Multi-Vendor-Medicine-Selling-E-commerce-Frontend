import ProductCard from "../Shared/ProductCard";


const categories = {
  'New Arrivals': ['https://demo2.wpthemego.com/themes/sw_mallon/layout2/wp-content/uploads/2021/06/Combo-Marimer-Baby-Daily-Nasal-Hygiene.jpg','https://demo2.wpthemego.com/themes/sw_mallon/layout2/wp-content/uploads/2021/06/Combo-Marimer-Baby-Daily-Nasal-Hygiene.jpg'], 
  'Recommend': ['https://demo2.wpthemego.com/themes/sw_mallon/layout2/wp-content/uploads/2021/06/Combo-Marimer-Baby-Daily-Nasal-Hygiene.jpg'],
  'Doctor Picks': ['https://demo2.wpthemego.com/themes/sw_mallon/layout2/wp-content/uploads/2021/06/Combo-Marimer-Baby-Daily-Nasal-Hygiene.jpg']
};

const ProductGrid = () => (
  <section className="my-10 px-4">
    <div className="grid md:grid-cols-3 gap-6">
      {Object.entries(categories).map(([title, items], idx) => (
        <div key={idx}>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xl font-bold">{title}</h3>
            <a href="#" className="text-blue-600 text-sm">SEE MORE →</a>
          </div>
          <div className="space-y-4">
            {items.map((item, i) => <ProductCard key={i} {...item} />)}
          </div>
        </div>
      ))}
    </div>
  </section>
);

export default ProductGrid;
