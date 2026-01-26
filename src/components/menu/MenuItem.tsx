import React from "react";
import type { MenuItem as MenuItemType } from "./types/menu";
import { useCart } from "../layout/CartContext"; // 1. Import hook

interface Props {
  item: MenuItemType;
  isFavorite?: boolean;
  onToggleFavorite: () => void;
  variant?: "default" | "favorite-list";
}

const MenuItem: React.FC<Props> = ({ 
  item, 
  isFavorite = false, 
  onToggleFavorite,
  variant = "default" 
}: Props) => {
  // 2. Use the hook
  const { addToCart } = useCart();

  return (
    <li className={`
      group flex flex-col md:flex-row md:justify-between md:items-start 
      border-b border-dashed border-gray-200 pb-4 transition-all 
      ${variant === 'favorite-list' ? 'bg-white/50 border-red-100 hover:bg-white' : 'hover:bg-slate-50'} 
      p-3 rounded-lg
    `}>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <h3 className={`text-xl font-semibold ${variant === 'favorite-list' ? 'text-[#3B2316]' : 'text-gray-900 group-hover:text-[#C8102E]'} transition-colors`}>
            {item.name}
          </h3>
          <span
            aria-hidden="true"
            className="hidden md:block flex-1 border-b border-gray-200 border-dotted mx-2 mb-1"
          />
        </div>

        <p className="text-gray-600 italic mt-1 leading-relaxed">
          {item.description}
        </p>
      </div>

      <div className="mt-4 md:mt-0 md:ml-6 flex items-center justify-between md:justify-end gap-4 min-w-[120px]">
        <span className="text-lg font-mono font-bold text-gray-800">
          ${item.price.toFixed(2)}
        </span>

        <div className="flex items-center gap-2">
            {/* --- NEW ADD TO CART BUTTON --- */}
            {variant === 'default' && (
                <button
                    onClick={() => addToCart(item)}
                    className="bg-[#C8102E] text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#a00d25] active:scale-95 transition-all shadow-sm"
                    aria-label={`Add ${item.name} to cart`}
                >
                    Add +
                </button>
            )}

            {/* Existing Favorite Toggle Button Logic */}
            {variant === 'favorite-list' ? (
            <button
                onClick={onToggleFavorite}
                aria-label="Remove from favorites"
                className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-red-50 text-[#C8102E] text-sm font-medium hover:bg-[#C8102E] hover:text-white transition-all shadow-sm"
            >
                <span>Remove</span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4">
                <path d="M6.28 5.22a.75.75 0 00-1.06 1.06L8.94 10l-3.72 3.72a.75.75 0 101.06 1.06L10 11.06l3.72 3.72a.75.75 0 101.06-1.06L11.06 10l3.72-3.72a.75.75 0 00-1.06-1.06L10 8.94 6.28 5.22z" />
                </svg>
            </button>
            ) : (
            <button
                onClick={onToggleFavorite}
                aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                className={`
                p-2 rounded-full transition-all duration-200 
                ${isFavorite 
                    ? "bg-red-50 text-[#C8102E] hover:bg-red-100" 
                    : "text-gray-300 hover:text-[#C8102E] hover:bg-gray-100"}
                `}
            >
                <svg 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill={isFavorite ? "currentColor" : "none"} 
                stroke="currentColor" 
                strokeWidth="2" 
                className="w-6 h-6"
                >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
            </button>
            )}
        </div>
      </div>
    </li>
  );
};

export default MenuItem;