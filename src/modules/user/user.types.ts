/** @format */

import type { Types } from 'mongoose';

export interface IUser {
  _id: Types.ObjectId;
  authId: Types.ObjectId;
  fullName: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
