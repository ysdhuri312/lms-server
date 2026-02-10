/** @format */

import type { Types } from 'mongoose';

export interface ICourse {
  _id: Types.ObjectId;
  title: string;
  thumbnail: string;
  instructorId: Types.ObjectId; // which instructor create the course
  description: string;
  category: string;
  price: number;
  modules: [
    {
      id: Types.ObjectId;
      title: string;
      slug: string;
      moduleDuration: string;
      lessonsCount: string;
      lessons: [
        {
          id: Types.ObjectId;
          title: string;
          duration: string;
          isPreview: boolean;
        },
      ];
    },
  ];
  stats: {
    CourseTime: string;
    totalModules: number;
    totalLessons: number;
  };
}
