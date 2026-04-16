import { useState, useEffect } from "react";
import { communityPostRepository } from "../repositories/communityPostRepository";
import { communityPostService } from "../services/communityPostService";
import type { CommunityPost } from "../components/home/types/communitypost";
import { useAuth, useUser } from "@clerk/clerk-react"; // Import Clerk hooks

export function useCommunityPosts() {
  const [posts, setPosts] = useState<CommunityPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // 1. Initialize Clerk tools
  const { getToken } = useAuth();
  const { user } = useUser();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      setIsLoading(true);
      const data = await communityPostRepository.getAll();
      setPosts(data);
      setError(null);
    } catch (err) {
      setError("Failed to load posts.");
    } finally {
      setIsLoading(false);
    }
  };

  const addPost = async (author: string, content: string) => {
    try {
      // Still validate using the service
      communityPostService.validatePost({ author, content });

      // 2. Grab the token (will be null if they are a guest)
      const token = await getToken();

      // Pass the token to the repository
      const newPost = await communityPostRepository.create(
        { author, content },
        token,
      );

      // Update UI with the new post at the top
      setPosts([newPost, ...posts]);
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  const deletePost = async (id: string) => {
    try {
      const token = await getToken();
      if (!token) throw new Error("You must be logged in to delete.");

      await communityPostRepository.delete(id, token);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (err: any) {
      setError(err.message);
      throw err;
    }
  };

  // 3. Return the user object so the UI can know who is logged in
  return { posts, isLoading, error, addPost, deletePost, user };
}
