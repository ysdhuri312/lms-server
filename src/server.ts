/** @format */

import { type Request, type Response } from 'express';
import app from './app.js';
import { BASE_URL, PORT } from './config/utils.js';

const port = PORT || 3000;
const baseUrl = BASE_URL;

/*

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

*/

app.get('/', (_req: Request, res: Response) => {
  res.json({
    success: true,
    message: 'Welcome to API v1.0.0',
  });
});

app.listen(port, () => {
  console.log(`Server running on ${baseUrl}:${port}`);
});
