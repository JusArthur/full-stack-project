export interface MenuReview {
    id: string;
    menuItemId: number;
    author: string;
    rating: number; // 1 to 5
    comment: string;
    date: Date;
  }