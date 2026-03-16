import { useState, useEffect } from "react";
import { menuReviewRepository } from "../repositories/menuReviewRepository";
import { menuReviewService } from "../services/menuReviewService";
import type { MenuReview } from "../components/menu/types/menuReview";

/**
 * Hook to manage menu review state, interactions, and calculations.
 * Returns: reviews array, averageRating number, and addReview function.
 */
export function useMenuReviews(menuItemId?: number) {
  const [reviews, setReviews] = useState<MenuReview[]>([]);
  const [averageRating, setAverageRating] = useState<number>(0);

  useEffect(() => {
    const fetchReviews = async () => {
      const data = menuItemId
        ? await menuReviewRepository.getByMenuItemId(menuItemId)
        : await menuReviewRepository.getAll();
      
      setReviews(data);
      setAverageRating(menuReviewService.calculateAverageRating(data));
    };
    fetchReviews();
  }, [menuItemId]);

  const addReview = async (author: string, rating: number, comment: string, itemId: number): Promise<string | null> => {
    const error = menuReviewService.validateReview(rating, comment);
    if (error) return error;

    const newReview: MenuReview = {
      id: crypto.randomUUID(),
      menuItemId: itemId,
      author,
      rating,
      comment,
      date: new Date()
    };
    
    const saved = await menuReviewRepository.create(newReview);
    const updatedList = [saved, ...reviews];
    
    setReviews(updatedList);
    setAverageRating(menuReviewService.calculateAverageRating(updatedList));
    return null;
  };

  return { reviews, averageRating, addReview };
}