/** @format */

import bcrypt from 'bcryptjs';
import { CustomErrorHandler } from '../../handlers/CustomError.js';
import type { LoginUserDTO, RegisterUserDTO } from './auth.dto.js';
import { Auth } from './auth.model.js';
import { User } from '../user/user.model.js';
import mongoose from 'mongoose';
import { generateToken } from '../../utils/token.js';

class AuthService {
  static async register({ fullName, email, password }: RegisterUserDTO) {
    if (!password || !email || !fullName)
      throw new CustomErrorHandler(400, 'Request body required');

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
          fullName: newUser.fullName,
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

  static async login({ email, password }: LoginUserDTO) {
    if (!email || !password)
      throw new CustomErrorHandler(400, 'Request body required');

    const auth = await Auth.findOne({ email }).exec();
    if (!auth) throw new CustomErrorHandler(400, 'User not registered');

    const isVerify = await bcrypt.compare(password, auth.password);
    if (!isVerify) throw new CustomErrorHandler(401, 'Invalid credentials');

    const user = await User.findOne({ authId: auth._id });
    if (!user) throw new CustomErrorHandler();

    const token = generateToken({
      userId: user._id.toString(),
      role: user.role,
    });

    return {
      user: {
        id: user._id.toString(),
        fullName: user.fullName,
        role: user.role,
      },
      token,
    };
  }
}

export default AuthService;
