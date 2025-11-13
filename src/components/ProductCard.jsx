import React from 'react';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(product);
  };

  return (
    <div className="product-card card">
      <div className="product-image">
        <img src={product.image} alt={product.name} loading="lazy" />
        {product.popular && (
          <span className="product-badge">Más vendido</span>
        )}
      </div>
      <div className="card-body">
        <h3 className="product-name">{product.name}</h3>
        <p className="product-description">{product.description}</p>
        <div className="product-footer">
          <span className="product-price">${product.price}</span>
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            aria-label={`Agregar ${product.name} al carrito`}
          >
            Agregar
          </button>
        </div>
      </div>
    </div>
  );
}

