import { prisma } from "../prisma.js";

export const communityPostService = {
  async getAllPosts() {
    return await prisma.communityPost.findMany({
      orderBy: { timestamp: "desc" },
    });
  },
  async createPost(data: { author: string; content: string }) {
    return await prisma.communityPost.create({
      data: {
        author: data.author,
        content: data.content,
      },
    });
  },
  async deletePost(id: string) {
    return await prisma.communityPost.delete({
      where: { id },
    });
  },
};
