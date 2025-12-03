import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import useWhatsApp from '../hooks/useWhatsApp';
import { IoCartOutline } from "react-icons/io5";


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
  const { isAuthenticated, token } = useAuth();
  const [isCheckingOut, setIsCheckingOut] = useState(false);

  const handleCheckout = async () => {
    if (cartItems.length === 0) return;
    
    setIsCheckingOut(true);

    if (isAuthenticated && token) {
      try {
        console.log("Intentando guardar pedido...", { items: cartItems, total: getTotalPrice() });
        const res = await fetch('http://localhost:3001/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },
          body: JSON.stringify({
            items: cartItems,
            total: getTotalPrice()
          })
        });
        
        if (!res.ok) {
          const errData = await res.json();
          console.error("Server error saving order:", errData);
          alert("Hubo un problema al guardar tu pedido en el historial: " + (errData.error || "Error desconocido"));
        } else {
          console.log("Pedido guardado correctamente en historial.");
        }
      } catch (error) {
        console.error("Network error saving order:", error);
        alert("Error de red: No se pudo guardar el pedido en tu historial.");
      }
    } else {
      console.log("Usuario no logueado, omitiendo guardado de historial.");
    }

    const orderMessage = formatOrder(cartItems, getTotalPrice());
    const whatsappUrl = waLink(orderMessage);
    
    window.open(whatsappUrl, '_blank');
    
    setTimeout(() => {
      clearCart();
      setIsCartOpen(false);
      setIsCheckingOut(false);
    }, 500);
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div
        className="cart-overlay"
        onClick={() => setIsCartOpen(false)}
        aria-hidden="true"
      />
      
      <div className="cart-panel" role="dialog" aria-label="Carrito de compras" aria-modal="true">
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
      <IoCartOutline size={24} color="#ffffffff" />
      {itemCount > 0 && (
        <span className="cart-badge">{itemCount}</span>
      )}
    </button>
  );
}

