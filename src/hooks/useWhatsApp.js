export default function useWhatsApp() {
  const phone = "+529211688116";
  const link = (message = "Hola, busco algo dulce para mi día… 🍓\n¿qué topping del día recomiendan?😋") => {
    const text = encodeURIComponent(message);
    const phoneDigits = phone.replace(/[^\d]/g, "");
    return `https://wa.me/${phoneDigits}?text=${text}`;
  };

  const formatOrder = (cartItems, total) => {
    const emoji = {
      header: '🍓',
      item: '✅',
      total: '💰',
      thanks: '🙏',
    };

    let message = ` *PEDIDO - MI DULCE CORAZÓN*\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += `*DETALLE DEL PEDIDO*\n\n`;

    cartItems.forEach((item, index) => {
      const subtotal = item.price * item.quantity;
      message += `${index + 1}. *${item.name}*\n`;
      message += `   Cantidad: ${item.quantity}\n`;
      message += `   Precio unitario: $${item.price}\n`;
      message += `   Subtotal: $${subtotal}\n\n`;
    });

    message += `━━━━━━━━━━━━━━━━━━━━\n`;
    message += ` *TOTAL A PAGAR: $${total}*\n\n`;
    message += `━━━━━━━━━━━━━━━━━━━━\n\n`;
    message += ` *¡Gracias por tu pedido!*\n\n`;
    message += `Por favor confirma la disponibilidad y el tiempo de entrega.`;

    return message;
  };

  return { waLink: link, formatOrder };
}
