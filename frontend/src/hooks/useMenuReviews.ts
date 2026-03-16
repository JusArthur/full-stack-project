import { useState, useEffect } from "react";
import { menuReviewRepository } from "../repositories/menuReviewRepository";
import type { MenuReview } from "../components/menu/types/menuReview";

export function useMenuReviews(menuItemId?: number) {
  const [reviews, setReviews] = useState<MenuReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchReviews() {
      try {
        setIsLoading(true);
        // Fetch specific item reviews if ID is provided, otherwise fetch all
        const data = menuItemId 
            ? await menuReviewRepository.getByMenuItemId(menuItemId)
            : await menuReviewRepository.getAll();
        
        if (isMounted) {
          setReviews(data);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError("Failed to load reviews from database.");
          console.error(err);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    }

    fetchReviews();

    return () => {
      isMounted = false; // Cleanup function to prevent state updates on unmounted components
    };
  }, [menuItemId]);

  // Calculate the average dynamically based on the database response
  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  return { reviews, averageRating, isLoading, error };
}