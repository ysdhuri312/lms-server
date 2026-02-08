/** @format */

import bcrypt from 'bcryptjs';
import { CustomErrorHandler } from '../../handlers/CustomError.js';
import type { RegisterUserDTO } from './auth.dto.js';
import { Auth } from './auth.model.js';
import { User } from '../user/user.model.js';
import mongoose from 'mongoose';
import { generateToken } from '../../utils/token.js';

class AuthService {
  static async register({ fullName, email, password }: RegisterUserDTO) {
    if (!password || !email || !fullName)
      throw new CustomErrorHandler(400, 'Enter all fields complsary');

    // DB session for catch error
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      const userExists = await Auth.exists({ email });
      if (userExists)
        throw new CustomErrorHandler(400, 'User already registered');

      const hashedPassword = await bcrypt.hash(password, 10);

      const newAuth = new Auth({
        email,
        password: hashedPassword,
        lastLogin: new Date(),
      });
      await newAuth.save({ session });

      const newUser = new User({ authId: newAuth._id, fullName });
      await newUser.save({ session });

      const token = generateToken({
        userId: newUser._id.toString(),
        role: newUser.role,
      });

      await session.commitTransaction();

      return {
        user: {
          id: newUser._id.toString(),
          email: newAuth.email,
          role: newUser.role,
        },
        token,
      };
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }
  }
}

export default AuthService;
