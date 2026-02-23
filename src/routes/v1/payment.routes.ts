/** @format */

import { Router } from 'express';
import PaymentController from '../../modules/payment/payment.controller.js';
import { isAuthenticated } from '../../middlewares/auth.middleware.js';

const router = Router();

router.post('/', isAuthenticated, PaymentController.createOrder);
router.post(
  '/verify-payment',
  isAuthenticated,
  PaymentController.verifyPayment,
);

export default router;
