/** @format */

import { Router } from 'express';
import AuthController from '../../modules/auth/auth.controller.js';

const router = Router();
const authController = new AuthController();

router.post('/register', authController.register);

export default router;
