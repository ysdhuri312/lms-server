/** @format */

import type { Request } from 'express';
import asyncHandler from '../../handlers/asyncError.js';
import CourseService from './course.service.js';

class CourseController {
  static getAllCourses = asyncHandler(async (_req, res) => {
    const result = await CourseService.getAllCourses();

    res.status(200).json({
      success: true,
      data: result.courses,
    });
  });

  static getSingleCourse = asyncHandler(async (req, res) => {
    const { slug } = req.params as { slug: string };

    const result = await CourseService.getSingleCourse(slug);

    res.status(200).json({
      success: true,
      data: result.course,
    });
  });
}

export default CourseController;
