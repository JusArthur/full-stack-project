import { postTestData } from "../testData/postTestData";
import type { CommunityPost } from "../components/home/types/communitypost";

// Simulate database state in memory
let postsInMemory = [...postTestData];

export const postRepository = {
  async getAll(): Promise<CommunityPost[]> {
    // Simulate network delay
    return new Promise((resolve) => {
      setTimeout(() => resolve([...postsInMemory]), 400);
    });
  },

  // Additional methods for adding/deleting posts
  async add(post: CommunityPost): Promise<void> {
    return new Promise((resolve) => {
      postsInMemory = [post, ...postsInMemory];
      setTimeout(resolve, 200);
    });
  },

  // Delete by ID
  async delete(id: string): Promise<void> {
    return new Promise((resolve) => {
      postsInMemory = postsInMemory.filter((p) => p.id !== id);
      setTimeout(resolve, 200);
    });
  }
};