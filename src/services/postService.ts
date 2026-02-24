import type { CommunityPost } from "../components/home/types/communitypost";

export const postService = {
  validatePost(post: CommunityPost): string | null {
    if (!post.author.trim()) return "Author name is required.";
    if (post.content.length < 5) return "Message is too short.";
    return null; // No error
  },
  
  formatDate(date: Date): string {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
    }).format(date);
  }
};