export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
}

export const MOCK_PRODUCTS: Product[] = [
  { id: "1", name: "Talisker 10", price: 85, category: "Whiskey", image: "/placeholder.jpg" },
  { id: "2", name: "Lagavulin 16", price: 120, category: "Whiskey", image: "/placeholder.jpg" },
  { id: "3", name: "Chateau Margaux", price: 500, category: "Wine", image: "/placeholder.jpg" },
  { id: "4", name: "Grey Goose", price: 45, category: "Vodka", image: "/placeholder.jpg" },
];