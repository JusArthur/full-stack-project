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
      isMounted = false;
    };
  }, [menuItemId]);

  // NEW: Function to submit a new review to the database and update local state
  const addReview = async (newReview: Omit<MenuReview, 'id' | 'date'>) => {
    try {
      const createdReview = await menuReviewRepository.create(newReview);
      // Prepend the new review to the local state so the UI updates instantly
      setReviews((prevReviews) => [createdReview, ...prevReviews]);
      return true;
    } catch (err) {
      console.error("Failed to submit review:", err);
      return false;
    }
  };

  const averageRating = reviews.length > 0 
    ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length 
    : 0;

  return { reviews, averageRating, isLoading, error, addReview };
}