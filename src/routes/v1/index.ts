/** @format */

import { Router } from 'express';
import authRouter from '../v1/auth.routes.js';
import courseRouter from '../v1/courses.routes.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/courses', courseRouter);

export default router;
