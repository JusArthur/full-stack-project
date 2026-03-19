import type { CommunityPost } from "../components/home/types/communitypost";
import { communityPostsTestData } from "../testData/communityPostsTestData";

let postsStore: CommunityPost[] = [...communityPostsTestData];

export const communityPostRepository = {
  async getAll(): Promise<CommunityPost[]> {
    // Return sorted by newest first
    return [...postsStore].sort(
      (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
    );
  },

  async create(post: CommunityPost): Promise<CommunityPost> {
    postsStore = [post, ...postsStore];
    return post;
  },

  async delete(id: string): Promise<boolean> {
    const beforeCount = postsStore.length;
    postsStore = postsStore.filter((post) => post.id !== id);
    return postsStore.length < beforeCount;
  },
};
