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
      _id: Types.ObjectId;
      title: string;
      moduleDuration: string;
      lesson: [
        {
          _id: Types.ObjectId;
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
