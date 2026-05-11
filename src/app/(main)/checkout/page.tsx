"use client";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const { items, removeItem, increaseQuantity, decreaseQuantity } = useCartStore();
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto px-4 md:px-8 py-16">
      <h1 className="text-[40px] font-serif font-bold mb-12 text-[#212529] tracking-tighter text-center">Checkout</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Order Summary */}
        <div className="space-y-8">
          <h2 className="text-[24px] font-serif font-medium pb-4 border-b border-[#E5E5E5]">Order Summary</h2>
          
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-center text-[16px] font-serif text-[#212529]">
                <div className="flex items-center gap-4">
                  <button onClick={() => removeItem(item.id)} className="text-red-500 hover:text-red-700 transition-colors font-bold w-6 h-6 flex items-center justify-center cursor-pointer">
                    ✕
                  </button>
                  <span className="text-gray-600">{item.name}</span>
                </div>
                
                <div className="flex items-center gap-3">
                  <div className="flex items-center border border-[#CCCCCC] rounded-sm">
                    <button onClick={() => decreaseQuantity(item.id)} className="px-3 py-1 hover:bg-gray-100">-</button>
                    <span className="px-3 py-1 border-x border-[#CCCCCC]">{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.id)} className="px-3 py-1 hover:bg-gray-100">+</button>
                  </div>
                  <span className="font-semibold min-w-[80px] text-right">
                    ${(item.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
            {items.length === 0 && <p className="text-gray-500 font-serif">Your cart is empty.</p>}
          </div>
          
          {items.length > 0 && (
            <div className="border-t border-[#E5E5E5] pt-6 flex justify-between items-center text-[20px] font-serif font-bold text-[#212529]">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          )}
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
            <button className="w-full bg-[#AB4227] text-white py-4 font-serif font-bold uppercase tracking-widest hover:bg-[#8e3620] transition-all rounded-sm cursor-pointer">
                Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
