import React from 'react';

const ProductCard = ({ title, price, originalPrice, image, rating = 0 }) => (
  <div className="p-4 bg-white border rounded-lg shadow-sm flex flex-col items-center text-center">
    <img src={image} alt={title} className="h-24 object-contain mb-3" />
    <h3 className="font-semibold text-sm">{title}</h3>
    <p className="text-red-600 font-bold">
      ${price}
      {originalPrice && <span className="line-through text-gray-400 ml-2 text-sm">${originalPrice}</span>}
    </p>
    {rating > 0 && (
      <div className="text-yellow-400">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</div>
    )}
  </div>
);

export default ProductCard;
