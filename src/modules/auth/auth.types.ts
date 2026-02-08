/** @format */

import type { Types } from 'mongoose';

export interface IAuth {
  _id: Types.ObjectId;
  email: string;
  password: string;
  provider?: 'local' | 'google';
  refreshToken?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
