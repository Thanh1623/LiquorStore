export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
}

export const products: Product[] = [
  {
    id: "p1",
    name: "Classic Whiskey",
    price: 50,
    category: "Whiskey",
    image: "/images/whiskey.jpg",
    description: "A premium classic whiskey.",
  },
  {
    id: "p2",
    name: "Aged Wine",
    price: 30,
    category: "Wine",
    image: "/images/wine.jpg",
    description: "An elegant aged wine.",
  },
];
