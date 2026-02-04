/** @format */

import mongoose from 'mongoose';
import { MONGODB_URI } from '../config/utils.js';

const uri = MONGODB_URI as string;

export const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: 'lms',
      serverSelectionTimeoutMS: 5000,
    });

    console.log(`✅ Database connected: ${mongoose.connection.host}`); // eslint-disable-line no-console
  } catch (error) {
    console.error('❌ Database connection failed'); // eslint-disable-line no-console
    throw error;
  }
};

export const disconnectDB = async () => {
  await mongoose.connection.close();
  console.log('🔌 Database disconnected'); // eslint-disable-line no-console
};
