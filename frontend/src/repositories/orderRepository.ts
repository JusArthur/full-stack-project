import type { CurrentOrder } from "../components/orders/types/order";

const API_BASE_URL = import.meta.env.PROD
  ? "/api/orders"
  : "http://localhost:3000/api/orders";

export const orderRepository = {
  async getCurrent(token: string): Promise<CurrentOrder> {
    const response = await fetch(`${API_BASE_URL}/current`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch current order");
    }

    const data = await response.json();

    return {
      customerName: data.customerName ?? "",
      pickupNotes: data.pickupNotes ?? "",
      items: Array.isArray(data.items) ? data.items : [],
    };
  },

  async saveCurrent(token: string, order: CurrentOrder): Promise<CurrentOrder> {
    const response = await fetch(`${API_BASE_URL}/current`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(order),
    });

    if (!response.ok) {
      throw new Error("Failed to save current order");
    }

    const data = await response.json();

    return {
      customerName: data.customerName ?? "",
      pickupNotes: data.pickupNotes ?? "",
      items: Array.isArray(data.items) ? data.items : [],
    };
  },
};