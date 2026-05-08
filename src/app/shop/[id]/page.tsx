import { ProductDetail } from "@/components/shop/ProductDetail";

// Mock data fetch
async function getProduct(id: string) {
  // In a real app, fetch from API
  return {
    id,
    name: "Bacardi 151 Degree",
    price: 120.00,
    image: "https://images.unsplash.com/photo-1549725510-1c6085a21008?auto=format&fit=crop&w=800&h=1000&q=80"
  };
}

export default async function Page({ params }: { params: { id: string } }) {
  const product = await getProduct(params.id);
  
  return (
    <main className="bg-white min-h-screen">
      <ProductDetail product={product} />
    </main>
  );
}
