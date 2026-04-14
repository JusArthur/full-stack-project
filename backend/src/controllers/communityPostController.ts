import { Request, Response } from "express";
import { communityPostService } from "../services/communityPostService.js";

export const communityPostController = {
  async getAll(req: Request, res: Response) {
    try {
      const posts = await communityPostService.getAllPosts();
      return res.json(posts);
    } catch (error) {
      return res.status(500).json({ error: "Failed to fetch posts" });
    }
  },
  async create(req: Request, res: Response) {
    try {
      const { author, content } = req.body;
      const newPost = await communityPostService.createPost({
        author,
        content,
      });
      return res.status(201).json(newPost);
    } catch (error) {
      return res.status(500).json({ error: "Failed to create post" });
    }
  },
  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await communityPostService.deletePost(id);
      return res.status(204).send();
    } catch (error) {
      return res.status(500).json({ error: "Failed to delete post" });
    }
  },
};
