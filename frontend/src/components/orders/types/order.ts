export type OrderItem = {
  id: string;
  menuItemId: number;
  name: string;
  price: number;
};

export type CurrentOrder = {
  customerName: string;
  pickupNotes: string;
  items: OrderItem[];
};