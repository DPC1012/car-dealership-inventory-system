// Express application. Routes are mounted here; the server entrypoint
// (server.ts) imports this app. Kept separate from server startup so tests can
// import the app without opening a port.
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { env } from './config/env';
import { authRouter } from './routes/auth.routes';
import { vehicleRouter } from './routes/vehicle.routes';
import { errorHandler } from './middleware/errorHandler';

export const app = express();

app.use(helmet());
app.use(cors({
  origin: env.CORS_ORIGIN.split(',').map((o) => o.trim()),
  credentials: true,
}));
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/auth', authRouter);
app.use('/api/vehicles', vehicleRouter);

// Error-handling middleware must be registered last.
app.use(errorHandler);

export default app;

