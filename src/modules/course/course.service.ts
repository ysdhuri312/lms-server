/** @format */

import { Course } from './course.model.js';

class CourseService {
  static async getAllCourses() {
    const courses = await Course.find({});
    return { courses };
  }

  static async getSingleCourse(slug: string) {
    const course = await Course.findOne({ slug });
    return { course };
  }
}

export default CourseService;
