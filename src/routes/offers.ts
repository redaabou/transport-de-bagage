import express from 'express';
import { createOffer, getAllOffers, getOfferById, updateOfferStatus } from '../controllers/offerController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validationMiddleware';
import { createOfferSchema, updateOfferSchema } from '../validators/offerValidator';

const router = express.Router();

router.post('/', authMiddleware, validateRequest(createOfferSchema), createOffer);
router.get('/', getAllOffers);
router.get('/:id', getOfferById);
router.put('/:id/status', authMiddleware, validateRequest(updateOfferSchema), updateOfferStatus);

export default router;