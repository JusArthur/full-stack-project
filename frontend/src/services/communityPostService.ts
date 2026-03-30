// import type { CommunityPost } from "../components/home/types/communitypost";

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
};
