import { Router } from "express";
import { ClerkExpressRequireAuth } from "@clerk/clerk-sdk-node";
import { orderController } from "../controllers/orderController.js";
import { validateCurrentOrder } from "../middleware/validateCurrentOrder.js";

const router = Router();

router.get("/current", ClerkExpressRequireAuth(), orderController.getCurrentOrder);
router.put(
  "/current",
  ClerkExpressRequireAuth(),
  validateCurrentOrder,
  orderController.saveCurrentOrder
);

export default router;