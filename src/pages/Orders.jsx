import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

export default function Orders() {
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const { addToCart, clearCart } = useCart();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mostFrequentProduct, setMostFrequentProduct] = useState(null);

  useEffect(() => {
    if (authLoading) return;
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    fetch('http://localhost:3001/api/orders/history', {
      headers: { 'x-access-token': token }
    })
    .then(res => res.json())
    .then(data => {
      setOrders(data);
      calculateFavorite(data);
      setLoading(false);
    })
    .catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, [isAuthenticated, token, navigate, authLoading]);

  const calculateFavorite = (ordersData) => {
    if (!ordersData || ordersData.length === 0) return;

    const productCounts = {};
    const productDetails = {};

    ordersData.forEach(order => {
      try {
        const items = typeof order.items === 'string' ? JSON.parse(order.items) : order.items;
        items.forEach(item => {
          productCounts[item.id] = (productCounts[item.id] || 0) + item.quantity;
          if (!productDetails[item.id]) {
            productDetails[item.id] = item;
          }
        });
      } catch (e) {
        console.error("Error parsing order items", e);
      }
    });

    let maxCount = 0;
    let favId = null;

    Object.entries(productCounts).forEach(([id, count]) => {
      if (count > maxCount) {
        maxCount = count;
        favId = id;
      }
    });

    if (favId && productDetails[favId]) {
      setMostFrequentProduct(productDetails[favId]);
    }
  };

  const handleAddFavorite = () => {
    if (mostFrequentProduct) {
      addToCart(mostFrequentProduct);
      alert(`¡Agregamos ${mostFrequentProduct.name} al carrito!`);
    }
  };

  const handleOrderAgain = (itemsData) => {
    try {
      const items = typeof itemsData === 'string' ? JSON.parse(itemsData) : itemsData;
      items.forEach(item => addToCart(item));
      alert("¡Productos agregados al carrito!");
    } catch (e) {
      console.error("Error adding items to cart", e);
    }
  };

  if (authLoading || loading) return <div className="container section center"><p>Cargando...</p></div>;

  return (
    <div className="container section">
      <div className="section-header">
        <h2>Mis Pedidos</h2>
        <p className="lead">Hola, {user?.username}. Aquí está tu historial de delicias.</p>
      </div>

      {mostFrequentProduct && (
        <div className="card" style={{ marginBottom: '32px', background: 'var(--cream)', border: '2px solid var(--primary)' }}>
          <div className="card-body" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <h3 style={{ margin: '0 0 8px', color: 'var(--primary)' }}>❤️ Pedir lo de siempre</h3>
              <p style={{ margin: 0 }}>Tu producto favorito es <strong>{mostFrequentProduct.name}</strong></p>
            </div>
            <button className="btn btn-primary" onClick={handleAddFavorite}>
              Agregar al carrito
            </button>
          </div>
        </div>
      )}

      {orders.length === 0 ? (
        <div className="center">
          <p>Aún no has realizado pedidos.</p>
          <a href="/" className="btn btn-primary">Ir al Menú</a>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '20px' }}>
          {orders.map(order => (
            <div key={order.id} className="card">
              <div className="card-body">
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', borderBottom: '1px solid #eee', paddingBottom: '8px' }}>
                  <strong>Pedido #{order.id}</strong>
                  <span className="muted">{new Date(order.created_at).toLocaleDateString()}</span>
                </div>
                <div style={{ marginBottom: '16px' }}>
                  {(() => {
                    try {
                      const items = JSON.parse(order.items);
                      return items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '4px' }}>
                          <span>{item.quantity}x {item.name}</span>
                          <span>${item.price * item.quantity}</span>
                        </div>
                      ));
                    } catch (e) { return <p>Error en datos del pedido</p>; }
                  })()}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #eee', paddingTop: '12px' }}>
                  <span style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>Total: ${order.total}</span>
                  <button className="btn btn-outline" onClick={() => handleOrderAgain(order.items)}>
                    Pedir de nuevo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
