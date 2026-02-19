/** @format */

import asyncHandler from '../handlers/asyncError.js';
import { CustomErrorHandler } from '../handlers/CustomError.js';
import { verifyToken } from '../utils/token.js';

export const isAuthenticated = asyncHandler((req, _res, next) => {
  const token = req.cookies.token as string;

  if (!token) throw new CustomErrorHandler(401, 'Unauthorized');

  const decoded = verifyToken(token);

  req.user = decoded;
  next();

  // {
  // userId: '698d9b1c0cd3429148afb3e4',
  // role: 'student',
  // iat: 1771496403,
  // exp: 1772101203
  // }
});
