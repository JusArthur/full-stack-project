import { useState, useEffect } from "react";
import type { CommunityPost } from "../components/home/types/communitypost";
import { communityPostRepository } from "../repositories/communityPostRepository";
import { communityPostService } from "../services/communityPostService";

export function useCommunityPosts() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = async () => {
    setIsLoading(true);
    try {
      const data = await communityPostRepository.getAll();
      setPosts(data);
    } catch {
      setError("Failed to fetch posts");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    void fetchPosts();
  }, []);

  const addPost = async (author: string, content: string) => {
    // 1. Validate (Frontend Service)
    const validationError = communityPostService.validatePost(author, content);
    if (validationError) return validationError;

    try {
      // 2. Save to Database (Repository sends just the text to the Backend)
      // The backend will create the ID and Timestamp, and send the complete object back!
      const savedPost = await communityPostRepository.create({
        author: author.trim(),
        content: content.trim(),
      });

      // 3. Update UI
      setPosts((prev) => [savedPost, ...prev]);
      return null;
    } catch (err) {
      return "Failed to connect to the server.";
    }
  };

  const removePost = async (id: string) => {
    await communityPostRepository.delete(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return { posts, isLoading, error, addPost, removePost };
}
