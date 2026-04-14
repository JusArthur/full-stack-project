import React, { useState } from "react";
import { useCart } from "../layout/useCart";
import { useMenuReviews } from "../../hooks/useMenuReviews";
import type { MenuItem as MenuItemType } from "./types/menu";
import { SignedIn, SignedOut, SignInButton, useUser } from "@clerk/clerk-react";

interface MenuItemProps {
  item: MenuItemType;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
  variant?: "default" | "favorite-list";
}

const MenuItem: React.FC<MenuItemProps> = ({
  item,
  variant = "default"
}) => {
  const { addToCart } = useCart();
  const { averageRating, reviews, addReview } = useMenuReviews(item.id);
  const { user } = useUser();
  
  // Removed author state since we will get it from Clerk
  const [isReviewing, setIsReviewing] = useState(false);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReviewSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim() || !user) return;

    setIsSubmitting(true);
    
    // Automatically retrieve the user's name from Clerk profile
    const authorName = user.fullName || user.firstName || user.username || "Anonymous Reviewer";
    
    const success = await addReview({
      author: authorName,
      rating: Number(rating),
      comment: comment.trim(),
      menuItemId: item.id
    });

    if (success) {
      setRating(5);
      setComment("");
      setIsReviewing(false);
    } else {
      alert("Failed to submit review. Please try again.");
    }
    
    setIsSubmitting(false);
  };

  return (
    <li className={`group flex flex-col border-b border-dashed border-gray-200 pb-4 transition-all ${variant === 'favorite-list' ? 'bg-white/50 border-red-100 hover:bg-white' : 'hover:bg-slate-50'} p-3 rounded-lg`}>
      <div className="flex flex-col md:flex-row md:justify-between md:items-start w-full">
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

          <div className="flex items-center gap-1 mt-2 text-yellow-500 text-sm">
            <span>{"★".repeat(Math.round(averageRating)) + "☆".repeat(5 - Math.round(averageRating))}</span>
            <span className="text-gray-500 text-xs ml-1">({reviews.length} reviews)</span>
            
            {/* Conditional Authentication Rendering */}
            {variant === 'default' && (
              <>
                <SignedIn>
                  <button 
                    onClick={() => setIsReviewing(!isReviewing)}
                    className="ml-3 text-xs font-semibold text-amber-600 hover:text-amber-800 underline"
                  >
                    {isReviewing ? "Cancel" : "Write a Review"}
                  </button>
                </SignedIn>
                <SignedOut>
                  <SignInButton mode="modal">
                    <button className="ml-3 text-xs font-semibold text-gray-400 hover:text-gray-600 underline">
                      Sign in to review
                    </button>
                  </SignInButton>
                </SignedOut>
              </>
            )}
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
      </div>

      {/* Review Submission Form (Simplified since we don't need the Author input anymore) */}
      {isReviewing && (
        <form onSubmit={handleReviewSubmit} className="mt-4 p-4 bg-white border border-amber-100 rounded-lg shadow-sm w-full md:w-2/3">
          <h4 className="text-sm font-bold text-gray-800 mb-3 uppercase tracking-wider">Leave a Review</h4>
          
          <div className="flex gap-4 mb-3">
            <div className="w-full">
              <label className="block text-xs font-semibold text-gray-600 mb-1">Rating</label>
              <select 
                value={rating}
                onChange={(e) => setRating(Number(e.target.value))}
                className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none"
              >
                {[5, 4, 3, 2, 1].map(num => (
                  <option key={num} value={num}>{num} Stars</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="mb-3">
            <label className="block text-xs font-semibold text-gray-600 mb-1">Comment</label>
            <textarea 
              required
              rows={2}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full text-sm p-2 border border-gray-300 rounded focus:ring-2 focus:ring-amber-500 focus:outline-none resize-none"
              placeholder="What did you think of this item?"
            />
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting}
            className="bg-amber-500 text-white px-4 py-2 rounded text-xs font-bold uppercase tracking-wide hover:bg-amber-600 active:scale-95 transition-all disabled:opacity-50"
          >
            {isSubmitting ? "Submitting..." : "Post Review"}
          </button>
        </form>
      )}
    </li>
  );
};

export default MenuItem;