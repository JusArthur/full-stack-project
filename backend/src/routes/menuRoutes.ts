import { Router } from 'express';
import { menuController } from '../controllers/menuController.js';

const router = Router();

router.get('/items', menuController.getAllItems);
router.get('/items/:id', menuController.getItemById);
router.get('/reviews', menuController.getAllReviews);
router.get('/items/:id/reviews', menuController.getReviewsByItemId);
router.post('/reviews', menuController.createReview);

export default router;