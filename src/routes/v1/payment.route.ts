/** @format */

import { Router } from 'express';
import PaymentController from '../../modules/payment/payment.controller.js';

const router = Router();

router.post('/', PaymentController.createOrder);
router.post('/verify-payment', PaymentController.verifyPayment);

export default router;
