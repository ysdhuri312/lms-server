/** @format */

import { IUser } from '../modules/user/user.interface';

declare global {
  namespace Express {
    interface Request {
      user: {
        userId: string;
        role: string;
        iat?: number;
        exp?: number;
      };
    }
  }
}
