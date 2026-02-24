import type { CommunityPost } from "../components/home/types/communitypost";

export const postService = {
  // Business logic: Validation
  validatePost(post: CommunityPost): string | null {
    if (!post.author || post.author.trim().length === 0) {
      return "Author name cannot be empty.";
    }
    if (!post.content || post.content.trim().length < 5) {
      return "Message must be at least 5 characters long.";
    }
    return null; // Valid
  },

  // Business logic: Sort by date (newest first)
  sortPostsByDate(posts: CommunityPost[]): CommunityPost[] {
    return [...posts].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  }
};