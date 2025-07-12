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
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: 24,
        padding: 24,
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      {categories.map(({ category, count, image }) => (
        <div
          key={category}
          onClick={() => navigate(`/category/${category}`)}
          style={{
            cursor: "pointer",
            borderRadius: 12,
            boxShadow:
              "0 2px 8px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)",
            overflow: "hidden",
            backgroundColor: "#fff",
            transition: "transform 0.2s ease, box-shadow 0.2s ease",
            display: "flex",
            flexDirection: "column",
            userSelect: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-6px)";
            e.currentTarget.style.boxShadow =
              "0 6px 16px rgba(0,0,0,0.2), 0 8px 24px rgba(0,0,0,0.1)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow =
              "0 2px 8px rgba(0,0,0,0.12), 0 4px 12px rgba(0,0,0,0.06)";
          }}
        >
          <div
            style={{
              height: 140,
              width: "100%",
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <img
              src={image || "/default-category.png"}
              alt={category}
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                transition: "transform 0.3s ease",
              }}
            />
          </div>

          <div style={{ padding: "16px 20px", flexGrow: 1 }}>
            <h3
              style={{
                margin: "0 0 8px 0",
                fontSize: 20,
                fontWeight: 600,
                color: "#2c3e50",
                textTransform: "capitalize",
                letterSpacing: "0.03em",
              }}
            >
              {category}
            </h3>
            <p
              style={{
                margin: 0,
                fontSize: 14,
                color: "#7f8c8d",
                fontWeight: 500,
              }}
            >
              {count} medicine{count !== 1 ? "s" : ""}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
