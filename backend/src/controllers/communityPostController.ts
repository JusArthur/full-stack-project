import { Request, Response } from "express";
import { communityPostService } from "../services/communityPostService.js";

export const communityPostController = {
  async getAll(req: Request, res: Response) {
    try {
      const posts = await communityPostService.getAllPosts();
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch posts" });
    }
  },

  async create(req: Request, res: Response) {
    try {
      const { author, content } = req.body;

      // Clerk attaches auth data to the request if the user is signed in
      const userId = (req as any).auth?.userId;

      const newPost = await communityPostService.createPost({
        author,
        content,
        userId,
      });
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: "Failed to create post" });
    }
  },

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const requesterId = (req as any).auth?.userId;

      // 1. If not signed in at all, block them
      if (!requesterId) {
        return res
          .status(401)
          .json({ error: "You must be logged in to delete a post." });
      }

      // 2. Find the post
      const post = await communityPostService.getPostById(id);
      if (!post) {
        return res.status(404).json({ error: "Post not found." });
      }

      // 3. YOUR ADMIN ID: You can replace this string with your actual Clerk user_id later
      const ADMIN_USER_ID = "user_YOUR_ADMIN_CLERK_ID_HERE";

      // 4. Check rules: Are they the admin? OR Are they the owner?
      if (requesterId === ADMIN_USER_ID || requesterId === post.userId) {
        await communityPostService.deletePost(id);
        return res.status(204).send();
      }

      // 5. If they aren't admin and don't own it, block them
      return res
        .status(403)
        .json({ error: "You do not have permission to delete this post." });
    } catch (error) {
      res.status(500).json({ error: "Failed to delete post" });
    }
  },
};
