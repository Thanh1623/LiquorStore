import { ProductDetail } from "@/components/shop/ProductDetail";
import { products } from "@/lib/mock-data";
import { notFound } from "next/navigation";

// Mock data fetch
async function getProduct(id: string) {
  const product = products.find((p) => p.id === id);
  if (!product) {
    return null;
  }
  return product;
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(id);

  if (!product) {
    notFound();
  }
  
  return (
    <main className="bg-white min-h-screen">
      <ProductDetail product={product} />
    </main>
  );
}
