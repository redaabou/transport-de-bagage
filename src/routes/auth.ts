import express from 'express';
import { register, login } from '../controllers/authController';
import { validateRequest } from '../middlewares/validationMiddleware';
import { createUserSchema, loginSchema } from '../validators/userValidator';

const router = express.Router();

router.post('/register', validateRequest(createUserSchema), register);
router.post('/login', validateRequest(loginSchema), login);

export default router;