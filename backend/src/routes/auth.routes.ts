import { Router } from 'express';
import { validate } from '../middleware/validate';
import { registerSchema } from '../schemas/auth.schema';
import { register } from '../controllers/auth.controller';

export const authRouter = Router();

authRouter.post('/register', validate({ body: registerSchema }), register);
