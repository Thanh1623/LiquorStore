"use client";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const items = useCartStore((state) => state.items);
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto px-4 md:px-8 py-16">
      <h1 className="text-[40px] font-serif font-bold mb-12 text-[#212529] tracking-tighter text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Order Summary */}
        <div className="space-y-8">
          <h2 className="text-[24px] font-serif font-medium pb-4 border-b border-[#E5E5E5]">Order Summary</h2>
          
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-[16px] font-serif text-[#212529]">
                <span className="text-gray-600">{item.name} <span className="text-black font-semibold">x{item.quantity}</span></span>
                <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>
          
          <div className="border-t border-[#E5E5E5] pt-6 flex justify-between items-center text-[20px] font-serif font-bold text-[#212529]">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        {/* Shipping Details */}
        <div className="space-y-8 bg-gray-50 p-8 rounded-sm border border-[#E5E5E5]">
          <h2 className="text-[24px] font-serif font-medium">Shipping Details</h2>
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Full Name</label>
              <input type="text" className="w-full p-4 border border-[#CCCCCC] rounded-sm focus:border-[#AB4227] focus:outline-none transition-colors" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Address</label>
              <input type="text" className="w-full p-4 border border-[#CCCCCC] rounded-sm focus:border-[#AB4227] focus:outline-none transition-colors" />
            </div>
            <button className="w-full bg-[#AB4227] text-white py-4 font-serif font-bold uppercase tracking-widest hover:bg-[#8e3620] transition-all rounded-sm">
                Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
