import { Router } from "express";
import { communityPostController } from "../controllers/communityPostController.js";

const router = Router();

router.get("/", communityPostController.getAll);
router.post("/", communityPostController.create);
router.delete("/:id", communityPostController.delete);

export default router;
