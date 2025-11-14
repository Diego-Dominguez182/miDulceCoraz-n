import React from "react";
import fresasConPay from "../assets/images/fresasconpay.jpg";
import useWhatsApp from "../hooks/useWhatsApp";

export default function Hero() {
  const { waLink } = useWhatsApp();

  return (
    <section id="inicio" className="container section hero" aria-label="Hero">
      <div>
        <h1>Fresas con crema que enamoran</h1>

        <p className="lead">
          Postres frescos, helados cremosos y hotcakes esponjosos, preparados al
          momento.
        </p>

        <div className="actions">
          <a href="#menu" className="btn btn-primary">
            Ver Menú
          </a>

          <a
            href={waLink("Hola, quiero ordenar por WhatsApp")}
            className="btn btn-outline"
          >
            Ordenar por WhatsApp
          </a>
        </div>

        <div className="badges" aria-label="Confianza">
          <span className="badge">Ingredientes frescos</span>
          <span className="badge">Hecho al momento</span>
        </div>
      </div>

      <div className="hero-media">
        <span className="sticker" aria-hidden>
          Más vendido
        </span>

        <img
          src={fresasConPay}
          alt="Vaso de fresas con crema con topping de pay de queso y chocolate"
          loading="eager"
        />

        <p className="img-caption">
          Fresas con crema y topping de pay de queso y chocolate
        </p>
      </div>
    </section>
  );
}
