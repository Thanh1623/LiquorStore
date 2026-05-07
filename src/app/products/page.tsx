import { ProductList } from "@/components/products/ProductList";

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-8 py-16">
      <h1 className="text-[32px] font-serif font-bold mb-8 text-[#212529]">Premium Collection</h1>
      <ProductList />
    </div>
  );
}