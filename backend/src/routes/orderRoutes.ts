import { Router } from "express";
import { orderController } from "../controllers/orderController.js";
import { validateCurrentOrder } from "../middleware/validateCurrentOrder.js";

const router = Router();

router.get("/current", orderController.getCurrentOrder);
router.put("/current", validateCurrentOrder, orderController.saveCurrentOrder);

export default router;