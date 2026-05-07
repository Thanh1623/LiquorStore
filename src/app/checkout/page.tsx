"use client";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto px-8 py-16">
      <h1 className="text-[32px] font-serif font-bold mb-8 text-[#212529]">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <div className="space-y-4">
          <h2 className="text-[22px] font-serif font-medium">Order Summary</h2>
          {items.map((item) => (
            <div key={item.id} className="flex justify-between border-b pb-2">
              <span>{item.name} x {item.quantity}</span>
              <span>${item.price * item.quantity}</span>
            </div>
          ))}
          <div className="font-bold text-[18px]">Total: ${total}</div>
        </div>
        <div className="space-y-4">
            <h2 className="text-[22px] font-serif font-medium">Shipping Details</h2>
            <input type="text" placeholder="Full Name" className="w-full p-3 border border-[#CCCCCC] rounded-[4px]" />
            <input type="text" placeholder="Address" className="w-full p-3 border border-[#CCCCCC] rounded-[4px]" />
            <button className="w-full bg-[#AB4227] text-white py-3 font-serif hover:bg-[#B7472A]">
                Place Order
            </button>
        </div>
      </div>
    </div>
  );
}