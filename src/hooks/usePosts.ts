import { useState, useEffect, useCallback } from "react";
import { postRepository } from "../repositories/postRepository";
import { postService } from "../services/postService";
import type { CommunityPost } from "../components/home/types/communitypost";

export function usePosts() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Load initial data
  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    try {
      const data = await postRepository.getAll();
      // T.2: Use service to sort/format if needed
      setPosts(data);
    } catch (error) {
      console.error("Failed to load posts", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addPost = useCallback(async (newPost: CommunityPost) => {
    // T.2: Use service for validation logic
    const validationError = postService.validatePost(newPost);
    if (validationError) {
      alert(validationError); // Simple feedback for now
      return;
    }

    // I.1: Use repository to persist data
    await postRepository.add(newPost);
    await loadPosts(); // Refresh list
  }, []);

  const removePost = useCallback(async (id: string) => {
    await postRepository.delete(id);
    await loadPosts();
  }, []);

  return { posts, addPost, removePost, isLoading };
}