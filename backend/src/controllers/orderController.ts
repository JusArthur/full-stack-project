import { Request, Response } from "express";
import { orderService } from "../services/orderService.js";

export const orderController = {
  async getCurrentOrder(req: Request, res: Response) {
    try {
      const currentOrder = await orderService.getCurrentOrder();

      if (!currentOrder) {
        return res.json({
          customerName: "",
          pickupNotes: "",
          items: [],
        });
      }

      return res.json({
        id: currentOrder.id,
        customerName: currentOrder.customerName,
        pickupNotes: currentOrder.pickupNotes,
        items: currentOrder.items,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Failed to fetch current order",
      });
    }
  },

  async saveCurrentOrder(req: Request, res: Response) {
    try {
      const { customerName, pickupNotes, items } = req.body;

      const savedOrder = await orderService.saveCurrentOrder({
        customerName: typeof customerName === "string" ? customerName : "",
        pickupNotes: typeof pickupNotes === "string" ? pickupNotes : "",
        items: Array.isArray(items) ? items : [],
      });

      return res.json({
        id: savedOrder.id,
        customerName: savedOrder.customerName,
        pickupNotes: savedOrder.pickupNotes,
        items: savedOrder.items,
      });
    } catch (error) {
      return res.status(500).json({
        error: "Failed to save current order",
      });
    }
  },
};