import useWhatsApp from "../hooks/useWhatsApp";
import { useCart } from "../context/CartContext";

export default function Header() {
  const { waLink } = useWhatsApp();
  const { getTotalItems, setIsCartOpen } = useCart();
  const itemCount = getTotalItems();

  return (
    <div className="header-wrap">
      <div className="topbar" role="region" aria-label="Promociones">
        <div className="topbar-inner">
          <span>🍓 Postres frescos todos los días</span>
          <a href="#menu">Ver Menú →</a>
        </div>
      </div>

      <header className="container header" role="banner">
        <a
          href="#inicio"
          className="brand"
          aria-label="Mi Dulce Corazón, ir al inicio"
        >
          <span>Mi Dulce Corazón</span>
        </a>
        <nav className="nav" aria-label="Principal">
          <a href="#menu">Menú</a>
          <a href="#especialidades">Especialidades</a>
          <a href="#ubicacion">Ubicación</a>
          <a href="#contacto">Contacto</a>
          {itemCount > 0 && (
            <button
              className="btn btn-outline header-cart-btn"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Carrito con ${itemCount} productos`}
            >
              🛒 Carrito ({itemCount})
            </button>
          )}
          <a
            className="btn btn-primary"
            href={waLink("Hola, quiero hacer un pedido")}
            target="_blank"
            rel="noopener noreferrer"
          >
            Pedir por WhatsApp
          </a>
        </nav>
      </header>
    </div>
  );
}
