import type { MenuReview } from "../components/menu/types/menuReview";

export const menuReviewsTestData: MenuReview[] = [
  { id: "1", menuItemId: 1, author: "Alice", rating: 5, comment: "Amazing bites!", date: new Date("2026-02-20") },
  { id: "2", menuItemId: 1, author: "Bob", rating: 4, comment: "Pretty good.", date: new Date("2026-02-21") },
  { id: "3", menuItemId: 2, author: "Charlie", rating: 5, comment: "Best coffee in town.", date: new Date("2026-02-22") },
  { id: "4", menuItemId: 2, author: "Diana", rating: 3, comment: "A bit too hot.", date: new Date("2026-02-23") },
  { id: "5", menuItemId: 3, author: "Eve", rating: 5, comment: "Huge burger!", date: new Date("2026-02-24") },
  { id: "6", menuItemId: 4, author: "Frank", rating: 4, comment: "Great for late nights.", date: new Date("2026-02-25") },
  { id: "7", menuItemId: 5, author: "Grace", rating: 5, comment: "Fluffy and delicious.", date: new Date("2026-02-26") },
  { id: "8", menuItemId: 6, author: "Hank", rating: 5, comment: "Can't decline these cookies!", date: new Date("2026-02-27") },
  { id: "9", menuItemId: 7, author: "Ivy", rating: 4, comment: "Crispy and nice.", date: new Date("2026-02-28") },
  { id: "10", menuItemId: 10, author: "Jack", rating: 5, comment: "Highly recommend.", date: new Date("2026-03-01") },
];