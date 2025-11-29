import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import HomePage from "./pages/index.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Orders from "./pages/Orders.jsx";
import Cart, { CartButton } from "./components/Cart.jsx";
import "./App.css";

export default function App() {
  useEffect(() => {
    document.title = "Mi Dulce Corazón — Fresas con crema, helados y más";
    const meta =
      document.querySelector('meta[name="description"]') ||
      document.createElement("meta");
    meta.name = "description";
    meta.content =
      "Postrería local: fresas con crema, hotcakes, helados y malteadas.";
    document.head.appendChild(meta);

    const icon =
      document.querySelector('link[rel="icon"]') ||
      document.createElement("link");
    icon.rel = "icon";
    icon.href =
      "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22%23E91E63%22/><circle cx=%2268%22 cy=%2272%22 r=%2210%22 fill=%22%23E53935%22/></svg>";
    document.head.appendChild(icon);
  }, []);

  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
          <Footer />
          <CartButton />
          <Cart />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
