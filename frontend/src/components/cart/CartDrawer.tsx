import { useState } from "react";
import { useCart } from "../layout/useCart";
import { cartService } from "../../services/cartService";

export function CartDrawer() {
  // Pull clearCart from useCart
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, clearCart } = useCart();
  const [showSuccess, setShowSuccess] = useState(false);
  const totalPrice = cartService.getTotalPrice(cartItems);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    // 1. Clear the cart
    clearCart();
    
    // 2. Show the success message bubble
    setShowSuccess(true);
    
    // 3. Automatically close the drawer and hide message after 3 seconds
    setTimeout(() => {
      setShowSuccess(false);
      setIsCartOpen(false);
    }, 3000);
  };

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">
      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => {
        setIsCartOpen(false);
        setShowSuccess(false);
      }} />
      
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-white shadow-xl transition-all flex flex-col relative">
          
          {/* Success Dialogue Bubble Overlay */}
          {showSuccess && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-6 bg-white/90 backdrop-blur-sm transition-all">
              <div className="bg-green-100 border-2 border-green-500 rounded-2xl p-8 text-center shadow-lg animate-bounce">
                <div className="text-4xl mb-4">🎉</div>
                <h3 className="text-xl font-bold text-green-800">Order Placed!</h3>
                <p className="text-green-700 mt-2">Your delicious meal is being prepared.</p>
                <button 
                  onClick={() => setIsCartOpen(false)}
                  className="mt-6 text-sm font-bold text-green-600 underline"
                >
                  Close
                </button>
              </div>
            </div>
          )}

          <div className="flex items-center justify-between px-4 py-6 border-b">
            <h2 className="text-xl font-bold text-[#3B2316]">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-black text-3xl">&times;</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 && !showSuccess ? (
              <p className="text-center py-20 text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="py-4 flex items-center justify-between">
                    <div>
                      <h3 className="font-bold">{item.name}</h3>
                      <p className="text-sm text-gray-500">${item.price.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center border rounded-full">
                        <button onClick={() => updateQuantity(item.id, -1)} className="px-3 py-1 hover:bg-gray-100 rounded-l-full">-</button>
                        <span className="px-2 font-bold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, 1)} className="px-3 py-1 hover:bg-gray-100 rounded-r-full">+</button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="p-4 border-t bg-gray-50">
            <div className="flex justify-between text-lg font-bold mb-4">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={cartItems.length === 0}
              className={`w-full py-3 rounded-full font-bold transition-colors ${
                cartItems.length === 0 
                ? "bg-gray-300 cursor-not-allowed" 
                : "bg-[#C8102E] text-white hover:bg-[#a00d25]"
              }`}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}