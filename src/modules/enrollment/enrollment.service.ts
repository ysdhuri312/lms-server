/** @format */

import { Enrollment } from './enrollment.model.js';

class EnrollmentService {
  static async getEnrolledCourses() {
    const response = await Enrollment.find({}).populate(
      'courseId',
      'title thumbnail stats',
    );

    return response;
  }
}

export default EnrollmentService;
