export default function Footer() {
  return (
    <footer role="contentinfo">
      <div className="container footer-grid">
        <div>
          <div className="brand">
            <strong>Mi Dulce Corazón</strong>
          </div>
          <p className="lead" style={{ marginTop: 8 }}>
            Postrería local. Dulce, fresco y al momento.
          </p>
        </div>

        <div>
          <h4>Enlaces</h4>
          <nav aria-label="Enlaces rápidos">
            <div>
              <a href="#inicio">Inicio</a>
            </div>
            <div>
              <a href="#menu">Menú</a>
            </div>
            <div>
              <a href="#especialidades">Especialidades</a>
            </div>
            <div>
              <a href="#contacto">Contacto</a>
            </div>
          </nav>
        </div>

        <div>
          <h4>Horarios</h4>
          <p className="small">L-D 12:00-21:00</p>
          <p className="small">
            Av. Miguel Hidalgo 1318, Coatzacoalcos, Veracruz
          </p>
        </div>

        <div>
          <h4>Redes</h4>
          <p className="small">
            <a href="#" aria-label="Instagram">
              Instagram
            </a>
          </p>
          <p className="small">
            <a href="#" aria-label="Facebook">
              Facebook
            </a>
          </p>
        </div>
      </div>

      <div className="container footer-mini">
        © {new Date().getFullYear()} Mi Dulce Corazón — Aviso de privacidad •
        Términos
      </div>
    </footer>
  );
}
