/** @format */

import { model, Schema, Types } from 'mongoose';
import type { IEnrollment } from './enrollment.types.js';

const enrollmentSchema = new Schema<IEnrollment>({
  userId: Types.ObjectId,
  courseId: Types.ObjectId,
  progress: {
    completedLessonsIds: { type: [Types.ObjectId], default: [] },
    completedCount: { type: Number, default: 0 },
  },
  status: { type: String, enum: ['Ongoing', 'Completed'], default: 'Ongoing' },
  enrolledAt: Date,
  completedAt: { type: Date, default: null },
});

export const Enrollment = model<IEnrollment>('Enrollment', enrollmentSchema);
