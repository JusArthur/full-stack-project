import type { CommunityPost } from "../components/home/types/communitypost";

export const communityPostService = {
  validatePost(author: string, content: string): string | null {
    if (!author.trim() || !content.trim()) {
      return "Please fill in both fields.";
    }
    if (author.trim().length < 2) {
      return "Name must be at least 2 characters.";
    }
    return null;
  },

  createNewPost(author: string, content: string): CommunityPost {
    return {
      id: crypto.randomUUID(),
      author: author.trim(),
      content: content.trim(),
      timestamp: new Date(),
    };
  },
};
