/** @format */

import { Router } from 'express';
import authRouter from '../v1/auth.routes.js';

const router = Router();

router.use('/auth', authRouter);

export default router;
