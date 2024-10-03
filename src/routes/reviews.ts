import express from 'express';
import { createReview, getReviewsByTransport } from '../controllers/reviewController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createReview);
router.get('/transport/:transportId', getReviewsByTransport);

export default router;