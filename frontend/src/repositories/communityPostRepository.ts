import type { CommunityPost } from "../components/home/types/communitypost";

const API_URL = import.meta.env.PROD
  ? "/api/communityPosts"
  : "http://localhost:3000/api/communityPosts";

export const communityPostRepository = {
  async getAll(): Promise<CommunityPost[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch posts");

    const data = await response.json();
    // Prisma sends dates back as ISO strings, so we convert them back to Date objects for the UI
    return data.map((post: any) => ({
      ...post,
      timestamp: new Date(post.timestamp),
    }));
  },

  async create(
    post: Omit<CommunityPost, "id" | "timestamp">,
  ): Promise<CommunityPost> {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    if (!response.ok) throw new Error("Failed to create post");
    const data = await response.json();
    return { ...data, timestamp: new Date(data.timestamp) };
  },

  async delete(id: string): Promise<boolean> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    });
    return response.ok;
  },
};
