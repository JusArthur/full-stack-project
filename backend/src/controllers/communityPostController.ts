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

      if (!requesterId) return res.status(401).json({ error: "Unauthorized" });

      // 1. Define the same array here
      const ADMIN_IDS = ["user_3CQ68G3b3gnl2JiqmpZWGW22miu"];

      const post = await communityPostService.getPostById(id);
      if (!post) return res.status(404).json({ error: "Not found" });

      // 2. Update the logic to check the array
      const isAdmin = ADMIN_IDS.includes(requesterId);
      const isOwner = post.userId === requesterId;

      if (isAdmin || isOwner) {
        await communityPostService.deletePost(id);
        return res.status(204).send();
      }

      return res.status(403).json({ error: "Forbidden" });
    } catch (error) {
      res.status(500).json({ error: "Server Error" });
    }
  },
};
