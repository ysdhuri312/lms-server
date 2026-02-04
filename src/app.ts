/** @format */

import express, { type Request, type Response } from 'express';
import path from 'node:path';

const app = express();

app.use(express.json());
app.use(express.static(path.join(path.resolve(), '/public')));

// Home Route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to API v1.0.0',
    status: 'oprational',
  });
});

export default app;
