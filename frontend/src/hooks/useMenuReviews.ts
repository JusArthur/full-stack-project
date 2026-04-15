import { useState, useEffect } from "react";
import { menuReviewRepository } from "../repositories/menuReviewRepository";
import type { MenuReview } from "../components/menu/types/menuReview";
import { useAuth } from "@clerk/clerk-react"; // Import Clerk hook

export function useMenuReviews(menuItemId?: number) {
  const [reviews, setReviews] = useState<MenuReview[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Extract the getToken function from Clerk
  const { getToken } = useAuth();

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

  const addReview = async (newReview: Omit<MenuReview, 'id' | 'date'>) => {
    try {
      // 1. Get the token securely from Clerk
      const token = await getToken();
      
      if (!token) {
        console.error("No authentication token available");
        return false;
      }

      // 2. Pass the token to the repository alongside the review data
      const createdReview = await menuReviewRepository.create(newReview, token);
      
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