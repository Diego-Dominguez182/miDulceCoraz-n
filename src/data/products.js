export const products = [
  {
    id: 1,
    name: 'Clásicas',
    description: 'Crema, fresas, leche condensada y chantilly',
    price: 85,
    image: '/images/fresasconcrema.jpg',
    category: 'fresas',
    popular: true,
  },
  {
    id: 2,
    name: 'Pay de queso',
    description: 'Fresas, trozos de pay de queso, crema y chantilly',
    price: 95,
    image: '/images/fresasconcremapayqueso.jpg',
    category: 'fresas',
    popular: true,
  },
  {
    id: 3,
    name: 'Nutella',
    description: 'Fresas, nutella, leche condensada y chantilly',
    price: 90,
    image: '/images/fresaschocolate.jpg',
    category: 'fresas',
    popular: false,
  },
  {
    id: 4,
    name: 'Frutos rojos',
    description: 'Crema de frutos rojos, queso philadeplhia trozos de arandanos y zarzamora',
    price: 90,
    image: '/images/fresasgalleta.jpg',
    category: 'fresas',
    popular: false,
  },
  {
    id: 5,
    name: 'Oreo',
    description: 'Crema, fresas, galletas Oreo y chantilly',
    price: 110,
    image: '/images/oreo.png',
    category: 'fresas',
    popular: true,
  },
  {
    id: 6,
    name: 'Kinder delice',
    description: 'Crema, fresas, chocolate Kinder Delice y chantilly',
    price: 70,
    image: '/images/kinder_delice.png',
    category: 'fresas',
    popular: true,
  },
  {
    id: 7,
    name: 'Mazapan',
    description: 'Crema batida, fresas, mazapan y chantilly',
    price: 70,
    image: '/images/fresaspremium.jpg',
    category: 'fresas',
    popular: true,
  },
  {
    id: 8,
    name: 'Malteada de fresa',
    description: 'Leche, crema batida, fresas, helado de fresas y chantilly',
    price: 75,
    image: '/images/malteadafresa.jpg',
    category: 'bebidas',
    popular: false,
  },
  {
    id: 9,
    name: 'Helado de fresa',
    description: 'Helado artesanal de fresa con crema',
    price: 70,
    image: '/images/heladofresa.jpg',
    category: 'mas',
    popular: false,
  },
  {
    id: 10,
    name: 'Nutella',
    description: 'Hotcakes esponjosos con crema de avellanas, crema y miel de maple',
    price: 95,
    image: '/images/hotcakesfresas.jpeg',
    category: 'hotcakes/waffles',
    popular: false,
  },
  {
    id: 11,
    name: 'Nutella',
    description: 'Waffle crujiente con crema de avellanas, crema batida y sirope',
    price: 95,
    image: '/images/hotcakesfresas.jpeg',
    category: 'hotcakes/waffles',
    popular: false,
  },
  {
    id: 12,
    name: 'Fresas',
    description: 'Hotcakes esponjosos con fresas, crema y miel de maple',
    price: 95,
    image: '/images/hotcakesfresas.jpeg',
    category: 'hotcakes/waffles',
    popular: true,
  },
  {
    id: 13,
    name: 'Fresas',
    description: 'Waffle crujiente con fresas, crema batida y sirope',
    price: 100,
    image: '/images/waffles.jpg',
    category: 'mas',
    popular: false,
  },
  {
    id: 14,
    name: 'Malteada de chocolate',
    description: 'Malteada de chocolate con crema batida y chispas',
    price: 75,
    image: '/images/malteadachoco.jpg',
    category: 'bebidas',
    popular: false,
  },
  {
    id: 14,
    name: 'Malteada de vainilla',
    description: 'Malteada de vainilla con crema batida y trozos de galleta',
    price: 75,
    image: '/images/malteadachoco.jpg',
    category: 'bebidas',
    popular: false,
  },
];

export const getProductById = (id) => {
  return products.find((product) => product.id === id);
};

export const getProductsByCategory = (category) => {
  return products.filter((product) => product.category === category);
};

export const getPopularProducts = () => {
  return products.filter((product) => product.popular);
};

