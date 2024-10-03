import express from 'express';
import { createTransport, getAllTransports, getTransportById, updateTransport, deleteTransport } from '../controllers/transportController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, createTransport);
router.get('/', getAllTransports);
router.get('/:id', getTransportById);
router.put('/:id', authMiddleware, updateTransport);
router.delete('/:id', authMiddleware, deleteTransport);

export default router;