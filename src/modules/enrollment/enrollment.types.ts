/** @format */

import type { Types } from 'mongoose';

export interface IEnrollment {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  courseId: Types.ObjectId;
  progress: {
    completedLessonsIds: [Types.ObjectId];
    completedCount: number;
  };
  status: 'Ongoing' | 'Completed';
  enrolledAt: Date;
  completedAt: Date;
}
