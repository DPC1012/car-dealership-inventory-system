import { Router } from 'express';
import { validate } from '../middleware/validate';
import { authRateLimiter } from '../middleware/rateLimiter';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { register, login } from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.post('/register', authRateLimiter, validate({ body: registerSchema }), register);
authRouter.post('/login', authRateLimiter, validate({ body: loginSchema }), login);

