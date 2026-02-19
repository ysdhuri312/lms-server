/** @format */

import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { CustomErrorHandler } from '../handlers/CustomError.js';

export const generateToken = (paylod: { userId: string; role: string }) => {
  return jwt.sign(paylod, env.JWT_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};

export const verifyToken = (token: string) => {
  if (!token) throw new CustomErrorHandler(401, 'Token not available');

  const decoded = jwt.verify(token, env.JWT_TOKEN_SECRET) as {
    userId: string;
    role: string;
    iat: number;
    exp: number;
  };

  if (!decoded) throw new CustomErrorHandler(401, 'Invalid token');

  return decoded;
};
