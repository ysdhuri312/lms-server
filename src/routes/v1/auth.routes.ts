/** @format */

import { Router } from 'express';
import AuthController from '../../modules/auth/auth.controller.js';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/logout', AuthController.logout);

export default router;
