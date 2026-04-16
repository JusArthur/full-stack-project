import { prisma } from "../prisma.js";

export const communityPostService = {
  async getAllPosts() {
    return await prisma.communityPost.findMany({
      orderBy: { timestamp: "desc" },
    });
  },

  // 1. Update createPost to accept an optional userId
  async createPost(data: { author: string; content: string; userId?: string }) {
    return await prisma.communityPost.create({
      data: {
        author: data.author,
        content: data.content,
        userId: data.userId || null, // null for guests
      },
    });
  },

  async deletePost(id: string) {
    return await prisma.communityPost.delete({
      where: { id },
    });
  },

  // 2. Add this helper method to find a post before we delete it
  async getPostById(id: string) {
    return await prisma.communityPost.findUnique({
      where: { id },
    });
  },
};
