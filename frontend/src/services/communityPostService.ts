// frontend/src/services/communityPostService.ts

export const communityPostService = {
  validatePost({
    author,
    content,
  }: {
    author: string;
    content: string;
  }): string | null {
    if (!author || author.trim().length < 2) {
      return "Author name must be at least 2 characters long.";
    }
    if (!content || content.trim().length < 1) {
      return "Post content cannot be empty.";
    }
    return null;
  },
};
