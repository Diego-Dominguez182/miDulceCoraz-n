import useWhatsApp from "../hooks/useWhatsApp";

export default function Header() {
  const { waLink } = useWhatsApp();
  return (
    <div className="header-wrap">
      <div className="topbar" role="region" aria-label="Promociones"></div>

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
          <a
            className="btn btn-primary"
            href={waLink("Hola, quiero hacer un pedido")}
          >
            Pedir por WhatsApp
          </a>
        </nav>
      </header>
    </div>
  );
}
