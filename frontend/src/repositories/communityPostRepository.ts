import type { CommunityPost } from "../components/home/types/communitypost";

const API_BASE_URL = import.meta.env.PROD ? "" : "http://localhost:3000";

const API_URL = `${API_BASE_URL}/api/communityPosts`;

export const communityPostRepository = {
  async getAll(): Promise<CommunityPost[]> {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch posts");
    const data = await response.json();
    return data.map((post: any) => ({
      ...post,
      timestamp: new Date(post.timestamp),
    }));
  },

  // 1. Accept an optional token for creating posts (since guests can post)
  async create(
    post: { author: string; content: string },
    token?: string | null,
  ): Promise<CommunityPost> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    // If a token was provided, attach it to the request
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers,
      body: JSON.stringify(post),
    });

    if (!response.ok) throw new Error("Failed to create post");
    const data = await response.json();
    return { ...data, timestamp: new Date(data.timestamp) };
  },

  // 2. Add the delete method (requires token)
  async delete(id: string, token: string): Promise<void> {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) throw new Error("Failed to delete post");
  },
};
