import React from 'react';
import Hero from '../components/Hero.jsx';
import ProductCard from '../components/ProductCard.jsx';
import { products, getPopularProducts, getProductsByCategory } from '../data/products';
import useWhatsApp from '../hooks/useWhatsApp';
import MenuCarousel from "../components/MenuCarousel.jsx";

export default function HomePage() {
  const { waLink } = useWhatsApp();
  const popularProducts = getPopularProducts();
  const fresasProducts = getProductsByCategory('fresas');
  const hotcakesProducts = getProductsByCategory('hotcakes');
  const bebidasProducts = getProductsByCategory('bebidas');
  const heladosProducts = getProductsByCategory('helados');

  return (
    <main id="content">
      <Hero />

      <section id="especialidades" className="container section">
        <div className="section-header">
          <h2>¡Lo que no te puedes perder!</h2>
          <p className="lead">
            Los productos más pedidos y mejor valorados por nuestros clientes
          </p>
        </div>
        <div className="products-grid">
          {popularProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

     <MenuCarousel />


      <section id="ubicacion" className="container section">
        <div className="section-header">
          <h2>Ubicación y Horarios</h2>
          <p className="lead">Visítanos o pide a domicilio</p>
        </div>
        <div className="location-grid">
          <div className="location-card card">
            <div className="card-body">
              <h3>Ubicación📍</h3>
              <p>
                <strong>Av. Miguel Hidalgo 1318</strong>
                <br />
                Coatzacoalcos, Veracruz
              </p>
              <a
                href="https://maps.google.com/?q=Av.+Miguel+Hidalgo+1318,+Coatzacoalcos,+Veracruz"
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Ver en Google Maps
              </a>
            </div>
          </div>
          <div className="location-card card">
            <div className="card-body">
              <h3>Horarios 🕐</h3>
              <p>
                <strong>Lunes - Domingo</strong>
                <br />
                12:00 PM - 9:00 PM
              </p>
              <p className="small muted">
                Abrimos todos los días para que disfrutes de nuestros deliciosos
                postres
              </p>
            </div>
          </div>
          {/* <div className="location-card card">
            <div className="card-body">
              <h3>🚚 Pedidos</h3>
              <p>
                Realiza tu pedido por WhatsApp y lo preparamos al momento
              </p>
              <a
                href={waLink('Hola, busco algo dulce para mi día… 🍓\n¿qué topping del día recomiendan?😋')}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Pedir por WhatsApp
              </a>
            </div>
          </div> */}
        </div>
      </section>

      <section id="contacto" className="container section">
        <div className="section-header">
          <h2>Contacto</h2>
          <p className="lead">
            Estamos aquí para hacerte feliz con nuestros postres
          </p>
        </div>
        <div className="contact-grid">
          <div className="contact-card card">
            <div className="card-body">
              <h3>💬 WhatsApp</h3>
              <p>Chatea con nosotros para hacer tu pedido</p>
              <a
                href={waLink('Hola, busco algo dulce para mi día… 🍓\n¿qué topping del día recomiendan?😋')}
                className="btn btn-primary"
                target="_blank"
                rel="noopener noreferrer"
              >
                Contactar por WhatsApp
              </a>
            </div>
          </div>
          <div className="contact-card card">
            <div className="card-body">
              <h3>📱 Redes Sociales</h3>
              <p>Síguenos para ver nuestras novedades</p>
              <div className="social-links">
                <a
                  href="#"
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  Instagram
                </a>
                <a
                  href="#"
                  className="btn btn-outline"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                >
                  Facebook
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
