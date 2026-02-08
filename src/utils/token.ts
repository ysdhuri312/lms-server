/** @format */

import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export const generateToken = (paylod: { userId: string; role: string }) => {
  return jwt.sign(paylod, env.JWT_TOKEN_SECRET, {
    expiresIn: '7d',
  });
};
