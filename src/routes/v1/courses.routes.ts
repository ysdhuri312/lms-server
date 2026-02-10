/** @format */

import { Router } from 'express';
import CourseController from '../../modules/course/course.controller.js';

const router = Router();

router.get('/', CourseController.getAllCourses);
router.get('/:slug', CourseController.getSingleCourse);

export default router;
