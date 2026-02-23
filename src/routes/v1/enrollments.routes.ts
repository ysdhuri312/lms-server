/** @format */

import { Router } from 'express';
import EnrollemnetController from '../../modules/enrollment/enrollment.controller.js';

const router = Router();

router.get('/enrollments', EnrollemnetController.getEnrolledCourses);

export default router;
