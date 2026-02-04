/** @format */

import { type Request, type Response } from 'express';
import app from './app.js';
import helmet from 'helmet';

const PORT: number = 3000;

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      'default-src': ["'self'"], // Allow your own domain
      'connect-src': ["'self'", 'http://localhost:3000', 'ws://localhost:*'], // Explicitly allow connections
      'script-src': ["'self'", "'unsafe-inline'"], // Allow scripts
      'style-src': ["'self'", "'unsafe-inline'"],
      'img-src': ["'self'", 'data:', 'https:'],
    },
  }),
);

app.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to API v1.0.0',
  });
});

app.listen(PORT, () => {
  console.log(`Application running on ${PORT}`);
});
