import express from 'express';
import { createOffer, getAllOffers, getOfferById, updateOfferStatus } from '../controllers/offerController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createOffer);
router.get('/', getAllOffers);
router.get('/:id', getOfferById);
router.put('/:id/status', authMiddleware, updateOfferStatus);

export default router;