/** @format */

import { validateWebhookSignature } from 'razorpay/dist/utils/razorpay-utils.js';
import { env } from '../../config/env.js';
import { razorpay } from '../../config/razorpay.js';
import type {
  CreateOrderDTO,
  CreatePaymentDTO,
  PaymentVeficationDTO,
} from './payment.dto.js';
import { CustomErrorHandler } from '../../handlers/CustomError.js';
import { Payment } from './payment.model.js';
import mongoose from 'mongoose';
import { Enrollment } from '../enrollment/enrollment.model.js';

class PaymentService {
  static async createOrder({
    amount,
    currency,
    receipt,
    notes,
  }: CreateOrderDTO) {
    const order = await razorpay.orders.create({
      amount,
      currency,
      receipt,
      notes,
    });
    return order;
  }

  static async createPayment({
    userEmail,
    courseId,
    orderId,
    amount,
    currency,
    status,
  }: CreatePaymentDTO) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      await new Payment({
        userEmail,
        courseId,
        orderId,
        amount,
        currency,
        status,
      }).save({ session });

      await session.commitTransaction();
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }

  static async verifyPayment({
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
  }: PaymentVeficationDTO) {
    const secret = env.RAZORPAY_API_SECRET;
    const body = razorpay_order_id + '|' + razorpay_payment_id;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const isValidSignature = validateWebhookSignature(
        body,
        razorpay_signature,
        secret,
      );
      if (!isValidSignature)
        throw new CustomErrorHandler(400, 'Payment verification failed');

      const payment = await Payment.findOne({ orderId: razorpay_order_id });

      if (!payment) throw new CustomErrorHandler(404, 'Order not found');

      // Update Payment
      payment.paymentId = razorpay_payment_id;
      payment.status = 'success';
      await payment.save();

      // Enrolled User
      await new Enrollment({
        userId: '6988487ed739306e5070d9e5', // Future changes
        courseId: payment.courseId,
        enrolledAt: Date.now(),
      }).save({ session });

      session.commitTransaction();

      return { success: true };
    } catch (error) {
      console.log(error);
      session.abortTransaction();
      throw new CustomErrorHandler(500, 'Internal server error');
    } finally {
      session.endSession();
    }
  }
}

export default PaymentService;
