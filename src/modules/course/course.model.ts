/** @format */

import { model, Schema, Types } from 'mongoose';
import type { ICourse } from './course.types.js';

const courseSchema = new Schema<ICourse>({
  title: { type: String, required: true },
  thumbnail: { type: String, required: true },
  instructorId: Types.ObjectId,
  description: { type: String, required: true },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  modules: [
    {
      id: Types.ObjectId,
      title: { type: String, required: true },
      slug: { type: String, required: true, unique: true },
      moduleDuration: { type: String, required: true },
      lessonsCount: { type: Number, required: true },
      lessons: [
        {
          id: Types.ObjectId,
          title: { type: String, required: true },
          duration: { type: String, required: true },
          isPreview: { type: Boolean, required: true },
        },
      ],
    },
  ],
  stats: {
    CourseTime: { type: String, required: true },
    totalModules: { type: Number, required: true },
    totalLessons: { type: Number, required: true },
    ratings: { type: String, required: true },
    enrolledStudents: { type: Number, required: true },
  },
});

export const Course = model<ICourse>('Course', courseSchema);
