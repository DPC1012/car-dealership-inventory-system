import { Router } from 'express';
import { validate } from '../middleware/validate';
import { registerSchema, loginSchema } from '../schemas/auth.schema';
import { register, login } from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.post('/register', validate({ body: registerSchema }), register);
authRouter.post('/login', validate({ body: loginSchema }), login);

