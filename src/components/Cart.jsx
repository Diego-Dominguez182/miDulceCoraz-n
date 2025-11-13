import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import useWhatsApp from '../hooks/useWhatsApp';

export default function Cart() {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    getTotalItems,
    isCartOpen,
    setIsCartOpen,
    clearCart,
  } = useCart();
  const { waLink, formatOrder } = useWhatsApp();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    setIsCheckingOut(true);
    const orderMessage = formatOrder(cartItems, getTotalPrice());
    const whatsappUrl = waLink(orderMessage);
    
    // Abrir WhatsApp en nueva ventana
    window.open(whatsappUrl, '_blank');
    
    // Limpiar carrito después de un breve delay
    setTimeout(() => {
      clearCart();
      setIsCartOpen(false);
      setIsCheckingOut(false);
    }, 500);
  };

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="cart-overlay"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />
      
      {/* Cart Panel */}
      <div className="cart-panel" role="dialog" aria-label="Carrito de compras">
        <div className="cart-header">
          <h2>Tu Pedido</h2>
          <button
            className="cart-close"
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar carrito"
          >
            ×
          </button>
        </div>

        <div className="cart-content">
          {cartItems.length === 0 ? (
            <div className="cart-empty">
              <p>Tu carrito está vacío</p>
              <button
                className="btn btn-outline"
                onClick={() => setIsCartOpen(false)}
              >
                Ver Menú
              </button>
            </div>
          ) : (
            <>
              <div className="cart-items">
                {cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-image">
                      <img src={item.image} alt={item.name} />
                    </div>
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p className="cart-item-price">${item.price}</p>
                    </div>
                    <div className="cart-item-controls">
                      <button
                        className="cart-btn-quantity"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        aria-label="Reducir cantidad"
                      >
                        −
                      </button>
                      <span className="cart-quantity">{item.quantity}</span>
                      <button
                        className="cart-btn-quantity"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        aria-label="Aumentar cantidad"
                      >
                        +
                      </button>
                      <button
                        className="cart-btn-remove"
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Eliminar producto"
                      >
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="cart-footer">
                <div className="cart-total">
                  <span>Total:</span>
                  <strong>${getTotalPrice()}</strong>
                </div>
                <button
                  className="btn btn-primary cart-checkout"
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                >
                  {isCheckingOut ? 'Enviando...' : 'Enviar por WhatsApp'}
                </button>
                <p className="cart-note">
                  Se abrirá WhatsApp con tu pedido listo para enviar
                </p>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

// Botón flotante del carrito
export function CartButton() {
  const { getTotalItems, setIsCartOpen, isCartOpen } = useCart();
  const itemCount = getTotalItems();

  if (isCartOpen) return null;

  return (
    <button
      className="cart-button"
      onClick={() => setIsCartOpen(true)}
      aria-label={`Carrito de compras, ${itemCount} items`}
    >
      <span className="cart-icon">🛒</span>
      {itemCount > 0 && (
        <span className="cart-badge">{itemCount}</span>
      )}
    </button>
  );
}

