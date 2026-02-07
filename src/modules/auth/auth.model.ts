/** @format */

import mongoose from 'mongoose';
import { type IAuth } from './auth.types.js';

const authSchema = new mongoose.Schema<IAuth>(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String, default: null },
    provider: { type: String, enum: ['local', 'google'], default: 'local' },
    lastLogin: { type: Date, required: true },
  },
  { timestamps: true },
);

export const Auth = mongoose.model<IAuth>('Auth', authSchema);
