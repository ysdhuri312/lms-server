/** @format */

import express, {
  type NextFunction,
  type Request,
  type Response,
} from 'express';
import path from 'node:path';
import errorHandler from './handlers/error.handler.js';
import { CustomErrorHandler } from './handlers/CustomError.handler.js';

const app = express();

// Middlewares
app.use(express.json());
app.use(express.static(path.join(path.resolve(), '/public')));

// Home Route
app.get('/', (_req: Request, res: Response, next: NextFunction) => {
  res.json({
    success: true,
    message: 'Welcome to API v1.0.0',
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// 404 route
app.use((req: Request, _res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.path}`);
  return next(new CustomErrorHandler(404, 'Route not found !', 'app'));
});

app.use(errorHandler);

export default app;
