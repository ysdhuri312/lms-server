/** @format */

import type { ErrorRequestHandler } from 'express';
import { NODE_ENV } from '../config/utils.js';

const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal server error';
  err.location = err.location;

  console.log(err.stack);

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
    timestamp: new Date().toISOString(),
    source: NODE_ENV === 'development' ? err.source : null,
    stack: NODE_ENV === 'development' ? err.stack : null,
  });
};

export default errorHandler;
