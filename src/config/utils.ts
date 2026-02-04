/** @format */

import dotenv from 'dotenv';
dotenv.config();

const { PORT, BASE_URL, MONGODB_URI } = process.env;

export { PORT, BASE_URL, MONGODB_URI };
