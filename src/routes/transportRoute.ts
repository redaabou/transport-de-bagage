import express from 'express';
import { createTransport, getAllTransports, getTransportById, updateTransport, deleteTransport } from '../controllers/transportController';
import { authMiddleware } from '../middlewares/authMiddleware';
import { validateRequest } from '../middlewares/validationMiddleware';
import { createTransportSchema, updateTransportSchema } from '../validators/transportValidator';
import { uploadMiddleware } from '../middlewares/upload';

const router = express.Router();

router.post('/', authMiddleware, uploadMiddleware, validateRequest(createTransportSchema), createTransport);
router.get('/', getAllTransports);
router.get('/:id', getTransportById);
router.put('/:id', authMiddleware, uploadMiddleware, validateRequest(updateTransportSchema), updateTransport);
router.delete('/:id', authMiddleware, deleteTransport);

export default router;