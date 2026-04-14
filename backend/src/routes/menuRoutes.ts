import { Router } from 'express';
import { menuController } from '../controllers/menuController.js';
import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';

const router = Router();

router.get('/items', menuController.getAllItems);
router.get('/items/:id', menuController.getItemById);
router.get('/reviews', menuController.getAllReviews);
router.get('/items/:id/reviews', menuController.getReviewsByItemId);
router.post('/reviews', ClerkExpressRequireAuth(), menuController.createReview);

export default router;