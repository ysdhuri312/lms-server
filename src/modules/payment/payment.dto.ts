/** @format */

export interface CreateOrderDTO {
  amount: number;
  currency: string;
  receipt: string;
  notes: {
    courseId: string;
    userId: string;
    country: string;
  };
}

export interface CreatePaymentDTO {
  userId: string;
  courseId: string;
  orderId: string;
  paymentId: string | null;
  amount: number;
  currency: string;
  status: 'pending' | 'success' | 'failed';
  mode: 'card' | 'upi' | null;
}

export interface PaymentVeficationDTO {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
}
