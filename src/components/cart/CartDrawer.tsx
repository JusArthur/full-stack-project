import { useCart } from "../layout/CartContext";

export function CartDrawer() {
  const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, totalPrice } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] overflow-hidden">

      <div className="absolute inset-0 bg-black/50 transition-opacity" onClick={() => setIsCartOpen(false)} />
      
      <div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
        <div className="w-screen max-w-md transform bg-white shadow-xl transition-all flex flex-col">
          <div className="flex items-center justify-between px-4 py-6 border-b">
            <h2 className="text-xl font-bold text-[#3B2316]">Your Cart</h2>
            <button onClick={() => setIsCartOpen(false)} className="text-gray-500 hover:text-black text-3xl">&times;</button>
          </div>

          <div className="flex-1 overflow-y-auto p-4">
            {cartItems.length === 0 ? (
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
            <button className="w-full bg-[#C8102E] text-white py-3 rounded-full font-bold hover:bg-[#a00d25]">
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}