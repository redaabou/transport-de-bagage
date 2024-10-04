import express from 'express';
import { createReview, getReviewsByTransport, updateReview } from '../controllers/reviewController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validationMiddleware';
import { createReviewSchema, updateReviewSchema } from '../validators/reviewValidator';

const router = express.Router();

router.post('/', authMiddleware, validateRequest(createReviewSchema), createReview);
router.get('/transport/:transportId', getReviewsByTransport);
router.put('/:id', authMiddleware, validateRequest(updateReviewSchema), updateReview);

export default router;