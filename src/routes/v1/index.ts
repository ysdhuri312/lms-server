/** @format */

import { Router } from 'express';
import authRouter from '../v1/auth.routes.js';
import courseRouter from '../v1/courses.routes.js';
import paymentRouter from './payment.routes.js';
import enrollmentRouter from '../v1/enrollments.routes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/courses', courseRouter);
router.use('/orders', paymentRouter);
router.use('/student', enrollmentRouter);

export default router;
