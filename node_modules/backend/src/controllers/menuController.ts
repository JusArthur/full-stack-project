import { Request, Response } from 'express';
import { menuService } from '../services/menuService.js';

export const menuController = {
  getAllItems: async (req: Request, res: Response) => {

    try {
    const items: Array<Record<string, any>> = await menuService.getAllItems();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch menu items" });
    }
  },

  getItemById: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const item: Array<Record<string, any>> = await menuService.getItemById(Number(id));
      if (!item) {
        return res.status(404).json({ error: "Item not found" });
      }
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch item" });
    }
  },

  getAllReviews: async (req: Request, res: Response) => {
    try {
      const reviews: Array<string> = await menuService.getAllReviews();
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch reviews" });
    }
  },

  getReviewsByItemId: async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const reviews: Array<string> = await menuService.getReviewsByItemId(Number(id));
      res.json(reviews);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch item reviews" });
    }
  },

  createReview: async (req: Request, res: Response) => {
    try {
      const { author, rating, comment, menuItemId } = req.body;
      if (!author || !rating || !comment || !menuItemId) {
        return res.status(400).json({ error: "Missing required fields" });
      }
      const review: Array<string = await menuService.createReview({ author, rating, comment, menuItemId });
      res.status(201).json(review);
    } catch (error) {
      res.status(500).json({ error: "Failed to create review" });
    }
  }
};