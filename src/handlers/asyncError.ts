/** @format */

import type { RequestHandler } from 'express';

const asyncHandler =
  (fn: RequestHandler): RequestHandler =>
  (res, req, next) => {
    Promise.resolve(fn(res, req, next)).catch(next);
  };

export default asyncHandler;
