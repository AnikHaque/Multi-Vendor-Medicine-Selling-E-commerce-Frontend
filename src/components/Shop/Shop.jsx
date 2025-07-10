import ProductCard from "./ProductCard";

const products = [
  {
    title: "Electronic thermometer",
    subtitle: "SALE UP TO 30%",
    button: "BUY NOW",
    image: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/10/banner1.png",
    bgColor: "bg-blue-500",
  },
  {
    title: "Vitamins A-B-C-D-E",
    subtitle: "MEDICAL GLOVES",
    button: "BUY NOW",
    image: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/10/banner2.png",
    bgColor: "bg-gray-100 text-black", // lighter bg, so text black
  },
  {
    title: "enchanted feeling",
    subtitle: "DUREX CONDOM",
    button: "BUY NOW",
    image: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/10/banner4.png",
    bgColor: "bg-sky-400",
  },
  {
    title: "Take care of your hand",
    subtitle: "MEDICAL GLOVES",
    button: "BUY NOW",
    image: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/10/banner5.png",
    bgColor: "bg-blue-300",
  },
  {
    title: "Arm Blood Pressure",
    subtitle: "HEALTH DEVICES",
    button: "BUY NOW",
    image: "https://demo.wpthemego.com/themes/sw_pharxtore/wp-content/uploads/2023/10/banner3.png",
    bgColor: "bg-gray-200 text-black",
  },
];

export default function Shop() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {products.map((product, i) => (
        <ProductCard
          key={i}
          product={product}
          className={i === 0 ? "row-span-2" : ""}
          
        />
      ))}
    </div>
    </div>
    
  );
}

