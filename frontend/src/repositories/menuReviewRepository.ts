import type { MenuReview } from "../components/menu/types/menuReview";

const API_BASE_URL = "http://localhost:3000/api/menu";

export const menuReviewRepository = {
  async getAll(): Promise<MenuReview[]> {
    const response = await fetch(`${API_BASE_URL}/reviews`);

    if (!response.ok) throw new Error("Failed to fetch reviews");
    const data = await response.json();
    return data.map((r: any) => ({ ...r, date: new Date(r.date) }));
  },
  
  async getByMenuItemId(menuItemId: number): Promise<MenuReview[]> {
    const response = await fetch(`${API_BASE_URL}/items/${menuItemId}/reviews`);
    
    if (!response.ok) throw new Error("Failed to fetch item reviews");
    const data = await response.json();
    return data.map((r: any) => ({ ...r, date: new Date(r.date) }));
  },
  
  async create(review: MenuReview): Promise<MenuReview> {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(review)
    });
    if (!response.ok) throw new Error("Failed to create review");
    const data = await response.json();
    return { ...data, date: new Date(data.date) };
  }
};