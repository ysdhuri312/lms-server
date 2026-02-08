/** @format */

import { model, Schema } from 'mongoose';
import { type IUser } from './user.types.js';

const userSchema = new Schema<IUser>(
  {
    authId: { type: Schema.Types.ObjectId, required: true, ref: 'Auth' },
    fullName: { type: String, required: true },
    role: {
      type: String,
      required: true,
      enum: ['student', 'admin', 'instructor'],
      default: 'student',
    },
  },
  { timestamps: true },
);

export const User = model<IUser>('User', userSchema);
