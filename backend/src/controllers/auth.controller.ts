// Auth controllers — thin HTTP layer. Parse handled by validate middleware;
// business logic lives in the service. Errors bubble to the error handler
// (Express 5 forwards async rejections automatically).
import type { Request, Response } from 'express';
import { registerUser, loginUser } from '../services/auth.service';
import { signToken } from '../utils/jwt';

export async function register(req: Request, res: Response): Promise<void> {
  const user = await registerUser(req.body);
  const token = signToken({ sub: user.id, role: user.role });
  res.status(201).json({ token, user });
}

export async function login(req: Request, res: Response): Promise<void> {
  const user = await loginUser(req.body);
  const token = signToken({ sub: user.id, role: user.role });
  res.status(200).json({ token, user });
}

