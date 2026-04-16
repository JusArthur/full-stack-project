import { Router } from "express";
import { communityPostController } from "../controllers/communityPostController.js";
import {
  ClerkExpressWithAuth,
  ClerkExpressRequireAuth,
} from "@clerk/clerk-sdk-node";

const router = Router();

// ClerkExpressWithAuth() lets guests through, but attaches userId if they ARE signed in
router.get("/", ClerkExpressWithAuth(), communityPostController.getAll);
router.post("/", ClerkExpressWithAuth(), communityPostController.create);

// ClerkExpressRequireAuth() completely blocks guests from even hitting this route
router.delete(
  "/:id",
  ClerkExpressRequireAuth(),
  communityPostController.delete,
);

export default router;
