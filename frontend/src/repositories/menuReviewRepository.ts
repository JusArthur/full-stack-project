import type { MenuReview } from "../components/menu/types/menuReview";

const API_BASE_URL = import.meta.env.PROD 
  ? "/api/menu" 
  : "http://localhost:3000/api/menu";

export const menuReviewRepository = {
  async getAll(): Promise<MenuReview[]> {
    const response = await fetch(`${API_BASE_URL}/reviews`);
    if (!response.ok) throw new Error("Failed to fetch reviews from backend");
    const data = await response.json();
    return data.map((r: any) => ({ ...r, date: new Date(r.date) }));
  },
  
  async getByMenuItemId(menuItemId: number): Promise<MenuReview[]> {
    const response = await fetch(`${API_BASE_URL}/items/${menuItemId}/reviews`);
    if (!response.ok) {
      console.warn(`Failed to fetch reviews for item ${menuItemId}, returning empty.`);
      return [];
    }
    const data = await response.json();
    return data.map((r: any) => ({ ...r, date: new Date(r.date) }));
  },
  
  // UPDATE: Add token parameter here
  async create(review: Omit<MenuReview, 'id' | 'date'>, token: string): Promise<MenuReview> {
    const response = await fetch(`${API_BASE_URL}/reviews`, {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        // Attach the Clerk token so the backend knows who is making the request
        "Authorization": `Bearer ${token}` 
      },
      body: JSON.stringify(review)
    });
    
    if (!response.ok) throw new Error("Failed to create review");
    
    const data = await response.json();
    return { ...data, date: new Date(data.date) };
  }
};