import React from "react";
import { useCart } from "../layout/useCart";
import { useMenuReviews } from "../../hooks/useMenuReviews";
import type { MenuItem as MenuItemType } from "./types/menu";

interface MenuItemProps {
  item: MenuItemType;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  variant?: "default" | "favorite-list";
}

/* * ARCHITECTURE INTEGRATION COMMENT:
 * This component invokes the custom `useMenuReviews` hook to handle the presentation logic
 * for rendering review counts and average ratings. The hook fetches data from 
 * `menuReviewRepository` and utilizes `menuReviewService` for calculations, 
 * keeping this UI component clean and decoupled.
 */
const MenuItem: React.FC<MenuItemProps> = ({
  item,
  variant = "default"
}) => {
  const { addToCart } = useCart();
  const { averageRating, reviews } = useMenuReviews(item.id);

  return (
    <li className={`group flex flex-col md:flex-row md:justify-between md:items-start border-b border-dashed border-gray-200 pb-4 transition-all ${variant === 'favorite-list' ? 'bg-white/50 border-red-100 hover:bg-white' : 'hover:bg-slate-50'} p-3 rounded-lg`}>
      <div className="flex-1">
        <div className="flex items-baseline gap-2">
          <h3 className={`text-xl font-semibold ${variant === 'favorite-list' ? 'text-[#3B2316]' : 'text-gray-900 group-hover:text-[#C8102E]'} transition-colors`}>
            {item.name}
          </h3>
          <span aria-hidden="true" className="hidden md:block flex-1 border-b border-gray-200 border-dotted mx-2 mb-1" />
        </div>

        <p className="text-gray-600 italic mt-1 leading-relaxed">
          {item.description}
        </p>

        {/* Dynamic Display from Hook */}
        <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
            <span>{"★".repeat(Math.round(averageRating)) + "☆".repeat(5 - Math.round(averageRating))}</span>
            <span className="text-gray-500 text-xs ml-1">({reviews.length} reviews)</span>
        </div>
      </div>

      <div className="mt-4 md:mt-0 md:ml-6 flex items-center justify-between md:justify-end gap-4 min-w-[120px]">
        <span className="text-lg font-mono font-bold text-gray-800">
          ${item.price.toFixed(2)}
        </span>

        <div className="flex items-center gap-2">
            {variant === 'default' && (
                <button
                    onClick={() => addToCart(item)}
                    className="bg-[#C8102E] text-white px-3 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide hover:bg-[#a00d25] active:scale-95 transition-all shadow-sm"
                >
                    Add +
                </button>
            )}
        </div>
      </div>
    </li>
  );
};

export default MenuItem;