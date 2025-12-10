import { useState } from "react";
import { products } from "../data/products";
import ProductCard from "../components/ProductCard.jsx";

const categoryLabels = {
  fresas: "Fresas con crema",
  bebidas: "Bebidas",
  hotcakes: "Hotcakes/ Waffles",
  mas: "Y más"
};

export default function MenuCarousel() {
  const categories = Array.from(new Set(products.map((p) => p.category)));

  const [index, setIndex] = useState(0);

  const total = categories.length;
  const currentCategory = categories[index];
  const items = products.filter((p) => p.category === currentCategory);
  const title = categoryLabels[currentCategory] ?? "Menú";

  const handleNext = () => setIndex((prev) => (prev + 1) % total);
  const handlePrev = () => setIndex((prev) => (prev - 1 + total) % total);

  return (
    <section id="menu" className="container section menu-carousel">
      <div className="section-header menu-carousel-header">
        <h2>Menú</h2>
        <p className="lead">
          {title}
        </p>
      </div>

      <div className="menu-carousel-body">
        <button
          type="button"
          className="carousel-arrow"
          onClick={handlePrev}
          aria-label="Categoría anterior"
        >
          ‹
        </button>

        <div className="carousel-card">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>

        <button
          type="button"
          className="carousel-arrow"
          onClick={handleNext}
          aria-label="Siguiente categoría"
        >
          ›
        </button>
      </div>

      <div className="carousel-dots">
        {categories.map((cat, i) => (
          <button
            key={cat}
            className={`carousel-dot ${i === index ? "active" : ""}`}
            onClick={() => setIndex(i)}
            aria-label={categoryLabels[cat] ?? cat}
          />
        ))}
      </div>
    </section>
  );
}
