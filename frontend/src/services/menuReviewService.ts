import type { MenuReview } from "../components/menu/types/menuReview";

export const menuReviewService = {
  calculateAverageRating(reviews: MenuReview[]): number {
    if (reviews.length === 0) return 0;
    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    return sum / reviews.length;
  },
  
  validateReview(rating: number, comment: string): string | null {
    if (rating < 1 || rating > 5) return "Rating must be between 1 and 5.";
    if (comment.trim().length < 3) return "Comment is too short.";
    return null;
  }
};