import { useState, useEffect } from "react";
import useWhatsApp from "../hooks/useWhatsApp";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { waLink } = useWhatsApp();
  const { getTotalItems, setIsCartOpen } = useCart();
  const { isAuthenticated, logout, user } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const itemCount = getTotalItems();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleAuthAction = () => {
    closeMenu();
    if (isAuthenticated) {
      logout();
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <header
        className={`container header ${scrolled ? "header-scrolled" : ""}`}
        role="banner"
      >
        <div className="header-main">
          {/* BRAND */}
          <a
            href="/"
            className="brand"
            aria-label="Mi dulce corazón, ir al inicio"
            onClick={closeMenu}
          >
            <span className="brand-title">Mi dulce corazón</span>
            <span className="brand-subtitle">Fresas para consentirte</span>
          </a>

          {/* NAV LINKS */}
          <nav className="nav desktop-only" aria-label="Principal">
            <a href="#menu">Menú</a>
            <a href="#especialidades">Especialidades</a>
            <a href="#ubicacion">Ubicación</a>
            <a href="#contacto">Contacto</a>
          </nav>

          {/* DESKTOP ACTIONS */}
          <div className="header-actions desktop-only">
            {itemCount > 0 && (
              <button
                className="btn btn-outline header-cart-btn"
                onClick={() => setIsCartOpen(true)}
                aria-label={`Carrito con ${itemCount} productos`}
              >
                🛒 Carrito ({itemCount})
              </button>
            )}

            {isAuthenticated ? (
              <>
                <a
                  href="/orders"
                  className="btn header-profile-btn"
                  onClick={closeMenu}
                >
                  Hola, {user?.username}
                </a>
                <button className="btn btn-outline" onClick={logout}>
                  Cerrar Sesión
                </button>
              </>
            ) : (
              <button
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                Iniciar Sesión
              </button>
            )}
          </div>

          {/* MOBILE ACTIONS */}
          <div className="header-actions-mobile">
            <button
              className="btn btn-outline header-cart-btn mobile-only"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Carrito con ${itemCount} productos`}
            >
              🛒 ({itemCount})
            </button>
            <button
              className="mobile-menu-btn"
              onClick={toggleMenu}
              aria-label={isMenuOpen ? "Cerrar menú" : "Abrir menú"}
              aria-expanded={isMenuOpen}
            >
              {isMenuOpen ? (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              ) : (
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      <div className={`mobile-nav-overlay ${isMenuOpen ? "open" : ""}`}>
        <nav className="mobile-nav">
          <a href="#menu" onClick={closeMenu}>Menú</a>
          <a href="#especialidades" onClick={closeMenu}>Especialidades</a>
          <a href="#ubicacion" onClick={closeMenu}>Ubicación</a>
          <a href="#contacto" onClick={closeMenu}>Contacto</a>

          {isAuthenticated && (
            <a href="/orders" onClick={closeMenu} style={{ color: 'var(--primary)' }}>
              Mis Pedidos
            </a>
          )}

          <a
            className="btn btn-primary"
            href={waLink('Hola, busco algo dulce para mi día… 🍓\n¿qué topping del día recomiendan?😋')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
          >
            Pedir por WhatsApp
          </a>

          {isAuthenticated ? (
            <button className="btn btn-primary" onClick={handleAuthAction}>
              Cerrar Sesión
            </button>
          ) : (
            <button className="btn btn-primary" onClick={handleAuthAction}>
              Iniciar Sesión
            </button>
          )}
        </nav>
      </div>
    </>
  );
}
