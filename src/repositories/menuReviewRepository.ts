import type { MenuReview } from "../components/menu/types/menuReview";
import { menuReviewsTestData } from "../testData/menuReviewsTestData";

let reviewsStore: MenuReview[] = [...menuReviewsTestData];

export const menuReviewRepository = {
  async getAll(): Promise<MenuReview[]> {
    return [...reviewsStore];
  },
  
  async getByMenuItemId(menuItemId: number): Promise<MenuReview[]> {
    return reviewsStore.filter(r => r.menuItemId === menuItemId);
  },
  
  async create(review: MenuReview): Promise<MenuReview> {
    reviewsStore = [review, ...reviewsStore];
    return review;
  }
};