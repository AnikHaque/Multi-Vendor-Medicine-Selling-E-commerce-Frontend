export default function ProductCard({ product, className, }) {
 

  return (
    <div
      className={`relative rounded-lg p-4 flex  items-center ${className}`}
      style={{
        backgroundImage: `url(${product.image})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        minHeight: "300px", // give some height
      }}
    >
      {/* Overlay to darken background for better text readability */}
      <div className="absolute inset-0  rounded-lg"></div>

      {/* Content box */}
      <div className="relative  text-black ">
        <p className="text-sm font-semibold">{product.subtitle}</p>
        <h3 className="text-xl font-bold">{product.title}</h3>
        <button className="mt-3 bg-white text-black rounded-full px-4 py-2">
          {product.button}
        </button>
      </div>
    </div>
  );
}
