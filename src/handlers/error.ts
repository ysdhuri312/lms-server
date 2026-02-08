/** @format */

import type { ErrorRequestHandler } from 'express';
import { env } from '../config/env.js';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  err.statusCode = err.statusCode;
  err.message = err.message;
  err.location = err.location;

  // console.log('error.ts', err.stack);

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    timestamp: new Date().toISOString(),
    source: env.NODE_ENV === 'development' ? err.source : null,
    stack: env.NODE_ENV === 'development' ? err.stack : null,
  });
};

export default errorHandler;
