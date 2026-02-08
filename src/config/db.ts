/** @format */

import mongoose from 'mongoose';
import { env } from './env.js';

const uri = env.MONGODB_URI;

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: 'lms',
      serverSelectionTimeoutMS: 5000,
    });

    console.log(
      `✅ Database connected: ${mongoose.connection.host}`.green.bold,
    ); // eslint-disable-line no-console
  } catch (error) {
    console.error('❌ Database connection failed'.red); // eslint-disable-line no-console
    throw error;
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log('🔌 Database disconnected'.green); // eslint-disable-line no-console
};
