// Catálogo único de productos. Edita aquí nombre, descripción,
// categoría, valor (precio), tamaño/peso (volume), imagen, etc.
// Tanto la sección de Productos como la Tienda se alimentan de este archivo.

export interface Product {
  id: string;
  name: string;
  description: string;
  category: string;
  volume: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  featured: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: "vibrador-clasico",
    name: "Vibrador Clásico",
    description: "Diseño suave al tacto, 12 modos de vibración y 100 % sumergible.",
    category: "Juguetes",
    volume: "14 cm",
    price: 24,
    imageUrl: "/images/products/candle.webp",
    featured: true,
  },
  {
    id: "masajeador-corporal",
    name: "Masajeador Corporal",
    description: "Aplicador de masaje con 10 velocidades, fácil de limpiar y silencioso.",
    category: "Cuerpo",
    volume: "18 cm",
    price: 28,
    imageUrl: "/images/products/shampoo.webp",
    featured: true,
  },
  {
    id: "juego-anillos",
    name: "Juego de Anillos",
    description: "Trío de anillos con ajuste cómodo y vibración extra para ambos.",
    category: "Juguetes",
    volume: "3 piezas",
    price: 19,
    imageUrl: "/images/products/lotion.webp",
    featured: true,
  },
  {
    id: "aceite-masaje",
    name: "Aceite de Masaje Caliente",
    description: "Se calienta al contacto con la piel y huele a vainilla. No mancha la ropa.",
    category: "Cuerpo",
    volume: "100 ml",
    price: 15,
    imageUrl: "/images/products/serum.webp",
    featured: true,
  },
  {
    id: "dados-deseo",
    name: "Dados del Deseo",
    description: "Lanza los dados y deja que la noche decida el juego.",
    category: "Juegos",
    volume: "2 dados",
    price: 11,
    imageUrl: "/images/products/cream.webp",
    featured: true,
  },
  {
    id: "cuerdas-seda",
    name: "Pack Cuerdas de Seda",
    description: "Cuerdas suaves de seda para explorar el juego de roles con confianza.",
    category: "Juegos",
    volume: "3 piezas",
    price: 45,
    imageUrl: "/images/products/oil.webp",
    featured: true,
  },
  {
    id: "cera-masaje",
    name: "Cera de Masaje Arde",
    description: "Cera tibia para masaje, punto de fusión bajo y aroma a miel.",
    category: "Ritual",
    volume: "200 ml",
    price: 12,
    imageUrl: "/images/products/candle.webp",
    featured: true,
  },
  {
    id: "espuma-bano",
    name: "Espuma de Baño Sensual",
    description: "Espuma cremosa con aroma a rosa y manteca de karité.",
    category: "Cuerpo",
    volume: "250 ml",
    price: 5,
    imageUrl: "/images/products/serum.webp",
    featured: false,
  },
  {
    id: "vela-masaje",
    name: "Vela de Masaje",
    description: "Se derrite en aceite tibio sobre la piel. Ideal para noches de pareja.",
    category: "Velas",
    volume: "60 g",
    price: 21,
    imageUrl: "/images/products/lotion.webp",
    featured: false,
  },
  {
    id: "kit-ritual",
    name: "Kit Ritual Nocturno",
    description: "Vela de masaje, aceite y cera en una caja lista para regalar.",
    category: "Ritual",
    volume: "1 caja",
    price: 32,
    imageUrl: "/images/products/oil.webp",
    featured: false,
  },
  {
    id: "vibrador-bullet",
    name: "Vibrador Bullet",
    description: "Discreto y versátil, con 7 modos de vibración.",
    category: "Juguetes",
    volume: "1 unidad",
    price: 15,
    oldPrice: 18,
    imageUrl: "/images/products/shampoo.webp",
    featured: false,
  },
  {
    id: "bragas-encaje",
    name: "Bragas de Encaje",
    description: "Lencería suave en encaje elástico, talla ajustable.",
    category: "Lencería",
    volume: "Talla M",
    price: 8,
    oldPrice: 10,
    imageUrl: "/images/products/cream.webp",
    featured: false,
  },
];

export function getProductById(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProducts(onlyFeatured = false): Product[] {
  return onlyFeatured ? PRODUCTS.filter((p) => p.featured) : PRODUCTS;
}

export function formatCurrency(price: number, symbol = "$"): string {
  return `${symbol}${price}`;
}