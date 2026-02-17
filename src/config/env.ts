/** @format */

import dotenv from 'dotenv';
dotenv.config();

export const env = {
  PORT: Number(process.env.PORT),
  BASE_URL: process.env.BASE_URL as string,
  MONGODB_URI: process.env.MONGODB_URI as string,
  NODE_ENV: process.env.NODE_ENV,
  JWT_TOKEN_SECRET: process.env.JWT_TOKEN_SECRET as string,
  RAZORPAY_API_KEY: process.env.RAZORPAY_API_KEY as string,
  RAZORPAY_API_SECRET: process.env.RAZORPAY_API_SECRET as string,
  FRONTEND_URL: process.env.FRONTEND_URL as string,
};
