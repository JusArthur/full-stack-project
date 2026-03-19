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
    // 1. Validate using the Service
    const validationError = communityPostService.validatePost(author, content);
    if (validationError) return validationError;

    // 2. Format using the Service
    const newPost = communityPostService.createNewPost(author, content);

    // 3. Save using the Repository
    const savedPost = await communityPostRepository.create(newPost);

    // 4. Update UI state
    setPosts((prev) => [savedPost, ...prev]);
    return null;
  };

  const removePost = async (id: string) => {
    await communityPostRepository.delete(id);
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  return { posts, isLoading, error, addPost, removePost };
}
