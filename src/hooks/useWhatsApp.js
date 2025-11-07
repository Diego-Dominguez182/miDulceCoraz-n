export default function useWhatsApp() {
  const phone = "+529211241515";
  const link = (message = "Hola, quiero hacer un pedido") => {
    const text = encodeURIComponent(message);
    const phoneDigits = phone.replace(/[^\d]/g, "");
    return `https://wa.me/${phoneDigits}?text=${text}`;
  };
  return { waLink: link };
}
