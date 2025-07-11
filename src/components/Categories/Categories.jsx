import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function CategoryCardSection() {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8800/api/categories")
      .then((res) => res.json())
      .then(setCategories)
      .catch(console.error);
  }, []);

  return (
    <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
      {categories.map(({ category, count, image }) => (
        <div
          key={category}
          onClick={() => navigate(`/category/${category}`)}
          style={{
            cursor: "pointer",
            border: "1px solid #ccc",
            borderRadius: 8,
            width: 200,
            padding: 10,
            textAlign: "center",
          }}
        >
          <img
            src={image || "/default-category.png"}
            alt={category}
            style={{ width: "100%", height: 120, objectFit: "cover" }}
          />
          <h3 style={{ textTransform: "capitalize" }}>{category}</h3>
          <p>{count} medicines</p>
        </div>
      ))}
    </div>
  );
}
