import React from "react";
import useWhatsApp from "../hooks/useWhatsApp";

const HERO_IMG =
  "https://scontent-lhr8-2.cdninstagram.com/v/t51.82787-15/517122468_17851132257493402_2442527920854433136_n.webp?_nc_cat=103&ig_cache_key=MzY3MTA3MjYzMTM0ODg5NDA5Ng%3D%3D.3-ccb1-7&ccb=1-7&_nc_sid=58cdad&efg=eyJ2ZW5jb2RlX3RhZyI6InhwaWRzLjEyNjR4MTQ0MC5zZHIuQzMifQ%3D%3D&_nc_ohc=_wFii_2vtLsQ7kNvwGwe-c-&_nc_oc=AdnVOKa9s_UBRSLPsrH-CZ2VOF2518w8AhaHcHytSU7kTUcYC84urRlltacPRcPqMU9z_Tbp335aDAh7ReQuk7hG&_nc_ad=z-m&_nc_cid=0&_nc_zt=23&_nc_ht=scontent-lhr8-2.cdninstagram.com&_nc_gid=iPgtsAGMMPcqySxGbruE2w&oh=00_Afj0CE0QRVE30uue4SFlzuoph84RnONxXmUokq1MoPJzCQ&oe=6913DE25";

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
          src={HERO_IMG}
          alt="Vaso de fresas con crema con topping de pay de queso y chocolate"
          loading="eager"
        />
      </div>
    </section>
  );
}
