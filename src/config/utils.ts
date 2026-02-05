/** @format */

import dotenv from 'dotenv';
dotenv.config();

const { PORT, BASE_URL, MONGODB_URI, NODE_ENV } = process.env;

export { PORT, BASE_URL, MONGODB_URI, NODE_ENV };
