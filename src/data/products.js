export const products = [
  {
    id: 1,
    name: 'Clásicas',
    description: 'Crema, fresas, leche condensada y chantilly',
    price: 85,
    image: '/images/clasicas.png',
    category: 'fresas',
    popular: false,
  },
  {
    id: 2,
    name: 'Pay de queso',
    description: 'Fresas, trozos de pay de queso, crema y chantilly',
    price: 95,
    image: '/images/fresasconcremapayqueso.png',
    category: 'fresas',
    popular: false,
  },
  {
    id: 3,
    name: 'Nutella',
    description: 'Fresas, nutella, leche condensada y chantilly',
    price: 90,
    image: '/images/nutella.png',
    category: 'fresas',
    popular: false,
  },
  {
    id: 4,
    name: 'Frutos rojos',
    description: 'Crema de frutos rojos, queso philadeplhia trozos de arandanos y zarzamora',
    price: 90,
    image: '/images/frutosrojos.png',
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
    popular: false,
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
    image: '/images/mazapan.png',
    category: 'fresas',
    popular: false,
  },
   {
    id: 8,
    name: 'Waffles con fresas',
    description: 'Waffle crujiente con fresas, crema batida y sirope',
    price: 100,
    image: '/images/waffles_fresa.png',
    category: 'hotcakes',
    popular: true,
  },
  {
    id: 9,
    name: 'Hotcakes con nutella',
    description: 'Hotcakes esponjosos con crema de avellanas, crema y miel de maple',
    price: 95,
    image: '/images/hotcakes_nutella.png',
    category: 'hotcakes',
    popular: true,
  },
 
  {
    id: 10,
    name: 'Hot cakes con fresas',
    description: 'Hotcakes esponjosos con fresas, crema y miel de maple',
    price: 95,
    image: '/images/hotcakesfresas.jpeg',
    category: 'hotcakes',
    popular: false,
  },
  {
    id: 11,
    name: 'Waffles con nutella',
    description: 'Waffle crujiente con crema de avellanas, crema batida y sirope',
    price: 95,
    image: '/images/waffles_nutella.png',
    category: 'hotcakes',
    popular: false,
  },
  {
    id: 12,
    name: 'Malteada de fresa',
    description: 'Leche, crema batida, fresas, helado de fresas y chantilly',
    price: 75,
    image: '/images/malteadafresa.jpg',
    category: 'bebidas',
    popular: false,
  },
  {
    id: 13,
    name: 'Malteada de chocolate',
    description: 'Leche, crema batida, suero de chocolate, helado de chocolate y chantilly',
    price: 75,
    image: '/images/malteadachoco.jpg',
    category: 'bebidas',
    popular: false,
  },
  {
    id: 14,
    name: 'Malteada de vainilla',
    description: 'Leche, crema batida, esencia de vainilla, helado de vainilla y chantilly',
    price: 75,
    image: '/images/malteada_vainilla.png',
    category: 'bebidas',
    popular: true,
  },
  {
    id: 15,
    name: 'Helado de fresa',
    description: 'Helado artesanal de fresas con crema y chispas',
    price: 70,
    image: '/images/heladofresa.jpg',
    category: 'mas',
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

