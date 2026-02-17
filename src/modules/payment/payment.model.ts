/** @format */

import { model, Schema, Types } from 'mongoose';
import type { IPayment } from './payment.types.js';

const paymentSchema = new Schema<IPayment>(
  {
    userId: Types.ObjectId,
    courseId: Types.ObjectId,
    orderId: String,
    paymentId: { type: String, default: null },
    amount: Number,
    currency: String,
    status: { type: String, enum: ['pending', 'success', 'failed'] },
    mode: { type: String, enum: ['card', 'upi', null], default: null },
  },
  {
    timestamps: true,
  },
);

export const Payment = model<IPayment>('Payment', paymentSchema);
