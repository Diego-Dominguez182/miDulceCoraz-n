export const products = [
  {
    id: 1,
    name: 'Fresas con Crema Clásica',
    description: 'Fresas frescas con crema batida, leche condensada y granola',
    price: 85,
    image: '../src/assets/images/fresasconcrema.jpg',
    category: 'fresas',
    popular: true,
  },
  {
    id: 2,
    name: 'Fresas con Crema y Pay de Queso',
    description: 'Fresas con crema, trozos de pay de queso y chocolate',
    price: 95,
    image: '../src/assets/images/fresasconcremapayqueso.jpg',
    category: 'fresas',
    popular: true,
  },
  {
    id: 3,
    name: 'Fresas con Crema y Chocolate',
    description: 'Fresas frescas con crema, salsa de chocolate y nueces',
    price: 90,
    image: './src/assets/images/fresaschocolate.jpg',
    category: 'fresas',
    popular: false,
  },
  {
    id: 4,
    name: 'Fresas con Crema y Galletas',
    description: 'Fresas con crema, galletas oreo trituradas y leche condensada',
    price: 90,
    image: './src/assets/images/fresasgalleta.jpg',
    category: 'fresas',
    popular: false,
  },
  {
    id: 5,
    name: 'Fresas con Crema Premium',
    description: 'Fresas premium, crema batida artesanal, frutos rojos y miel',
    price: 110,
    image: '../src/assets/images/fresaspremium.jpg',
    category: 'fresas',
    popular: true,
  },
  {
    id: 6,
    name: 'Malteada de Fresa',
    description: 'Malteada cremosa de fresa con crema batida y fresas frescas',
    price: 75,
    image: '../src/assets/images/malteadafresa.jpg',
    category: 'bebidas',
    popular: false,
  },
  {
    id: 7,
    name: 'Helado de Fresa',
    description: 'Helado artesanal de fresa con fresas frescas y crema',
    price: 70,
    image: '../src/assets/images/heladofresa.jpg',
    category: 'helados',
    popular: false,
  },
  {
    id: 8,
    name: 'Hotcakes con Fresas',
    description: 'Hotcakes esponjosos con fresas, crema y miel de maple',
    price: 95,
    image: '../src/assets/images/hotcakesfresas.jpeg',
    category: 'hotcakes',
    popular: true,
  },
  {
    id: 9,
    name: 'Waffle con Fresas',
    description: 'Waffle crujiente con fresas, crema batida y sirope',
    price: 100,
    image: '../src/assets/images/waffles.jpg',
    category: 'hotcakes',
    popular: false,
  },
  {
    id: 10,
    name: 'Malteada de Chocolate',
    description: 'Malteada de chocolate con crema batida y chispas',
    price: 75,
    image: '../src/assets/images/malteadachoco.jpg',
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

