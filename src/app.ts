/** @format */

import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import path from 'node:path';
import errorHandler from './handlers/error.js';
import { CustomErrorHandler } from './handlers/CustomError.js';

import v1Routes from './routes/v1/index.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(path.resolve(), '/public')));

// Home Route
app.get('/api/v1/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to API v1.0.0',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Router v1
app.use('/api/v1/', v1Routes);

// 404 route
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  return next(new CustomErrorHandler(404, 'Route not found !', 'app'));
});

app.use(errorHandler);

export default app;
