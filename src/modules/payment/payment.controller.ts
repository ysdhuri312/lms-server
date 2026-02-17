/** @format */

import type { Request } from 'express';
import asyncHandler from '../../handlers/asyncError.js';
import type { CreateOrderDTO, PaymentVeficationDTO } from './payment.dto.js';
import PaymentService from './payment.service.js';
import { env } from '../../config/env.js';
import { Course } from '../course/course.model.js';
import { CustomErrorHandler } from '../../handlers/CustomError.js';

class PaymentController {
  static createOrder = asyncHandler(
    async (req: Request<{}, {}, CreateOrderDTO>, res) => {
      const { currency, receipt, notes } = req.body;

      const course = await Course.findById(notes.courseId);

      if (!course) throw new CustomErrorHandler(404, 'Course not found');

      const amount = course.price * 100;

      const order = await PaymentService.createOrder({
        amount,
        currency,
        receipt,
        notes: {
          courseId: course._id.toString(),
          userId: '6988487ed739306e5070d9e5', // Future changes
          country: 'India',
        },
      });

      await PaymentService.createPayment({
        userId: notes.userId,
        courseId: notes.courseId,
        orderId: order.id,
        paymentId: null,
        mode: null,
        amount: amount,
        currency: currency,
        status: 'pending',
      });

      res.status(202).json({
        success: true,
        message: 'Course order sucessfully',
        data: order,
        key: env.RAZORPAY_API_KEY,
      });
    },
  );

  static verifyPayment = asyncHandler(
    async (req: Request<{}, {}, PaymentVeficationDTO>, res) => {
      const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
        req.body;

      const response = await PaymentService.verifyPayment({
        razorpay_order_id,
        razorpay_payment_id,
        razorpay_signature,
      });

      res.status(202).json({
        success: true,
        message: 'Payment verified',
        response,
      });
    },
  );
}

export default PaymentController;
