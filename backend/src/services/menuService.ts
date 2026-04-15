import { prisma } from "../prisma.js";

export const menuService = {
  getAllItems: async () => {
    return prisma.menuItem.findMany();
  },

  getItemById: async (id: number) => {
    return prisma.menuItem.findUnique({ where: { id } });
  },

  getAllReviews: async () => {
    return prisma.menuReview.findMany({
      orderBy: { date: "desc" },
    });
  },

  getReviewsByItemId: async (menuItemId: number) => {
    return prisma.menuReview.findMany({
      where: { menuItemId },
      orderBy: { date: "desc" },
    });
  },

  createReview: async (data: {
    userId: string;
    author: string;
    rating: number;
    comment: string;
    menuItemId: number;
  }) => {
    return prisma.menuReview.create({ data });
  },
};
