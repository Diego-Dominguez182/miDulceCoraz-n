import React from 'react';
import Hero from '../components/Hero.jsx';

export default function HomePage() {
  return (
    <main id="content">
      <Hero />

      <section id="especialidades" className="container section">
        <h2>Nuestros imperdibles (Próximo)</h2>
      </section>

      <section id="menu" className="container section">
        <h2>Menú (Próximo)</h2>
      </section>


      <section id="ubicacion" className="container section">
        <h2>Ubicación & Horarios (Próximo)</h2>
      </section>

      <section id="contacto" className="container section">
        <h2>Contacto (Próximo)</h2>
      </section>
    </main>
  );
}
