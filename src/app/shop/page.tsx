import { ProductCard } from "@/components/shop/ProductCard";

const products = [
  { id: 1, name: "Vintage Reserve", category: "Whiskey", price: 120.00, image: "https://images.unsplash.com/photo-1527281400688-1961e5f171d2?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 2, name: "Botanical Gin", category: "Gin", price: 85.00, image: "https://images.unsplash.com/photo-1598214886806-c87b84b7078b?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 3, name: "Aged Brandy", category: "Brandy", price: 95.00, image: "https://images.unsplash.com/photo-1549725510-1c6085a21008?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 4, name: "Dark Spiced Rum", category: "Rum", price: 75.00, image: "https://images.unsplash.com/photo-1614362545857-3bc16c4c7d1b?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 5, name: "Premium Tequila", category: "Tequila", price: 110.00, image: "https://images.unsplash.com/photo-1516537596096-735399587a8b?auto=format&fit=crop&w=600&h=800&q=80" },
  { id: 6, name: "Craft Vodka", category: "Vodka", price: 65.00, image: "https://images.unsplash.com/photo-1550989460-0adf9ea622e2?auto=format&fit=crop&w=600&h=800&q=80" },
];

export default function ShopPage() {
  return (
    <main className="bg-[#FDFBF7] min-h-screen py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-[#1A1A1A] mb-6">Our Collection</h1>
          <p className="max-w-xl mx-auto text-gray-600 font-serif italic text-lg">
            Discover a curated selection of premium spirits, aged to perfection and crafted for discerning palates.
          </p>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </main>
  );
}
