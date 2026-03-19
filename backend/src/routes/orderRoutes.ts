import { Router } from "express";
import { orderController } from "../controllers/orderController.js";

const router = Router();

router.get("/current", orderController.getCurrentOrder);
router.put("/current", orderController.saveCurrentOrder);

export default router;