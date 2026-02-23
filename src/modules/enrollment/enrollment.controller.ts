/** @format */

import asyncHandler from '../../handlers/asyncError.js';
import EnrollmentService from './enrollment.service.js';

class EnrollemnetController {
  static getEnrolledCourses = asyncHandler(async (_req, res) => {
    const courses = await EnrollmentService.getEnrolledCourses();

    res.status(200).json({
      success: true,
      message: 'Student enrolled courses fetch successfully',
      courses,
    });
  });
}

export default EnrollemnetController;
