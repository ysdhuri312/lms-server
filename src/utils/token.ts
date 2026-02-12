/** @format */

import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { CustomErrorHandler } from '../handlers/CustomError.js';
import { userInfo } from 'node:os';

export const generateToken = (paylod: { userId: string; role: string }) => {
  return jwt.sign(paylod, env.JWT_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string) => {
  if (!token) throw new CustomErrorHandler(401, 'Token not available');

  const decoded = jwt.verify(token, env.JWT_TOKEN_SECRET, (err, result) => {
    if (err) throw new CustomErrorHandler(401, 'Invalid token');
    return result;
  });

  return { user: decoded };
};
