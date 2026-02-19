/** @format */

import type { Types } from 'mongoose';

export interface IPayment {
  _id: Types.ObjectId;
  userEmail: string;
  courseId: string;
  orderId: string;
  paymentId: string | null;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  mode: 'card' | 'upi' | null;
  createdAt: Date;
  updatedAt: Date;
}
