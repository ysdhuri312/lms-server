/** @format */

import bcrypt from 'bcryptjs';
import { CustomErrorHandler } from '../../handlers/CustomError.js';
import type { RegisterUserDTO } from './auth.dto.js';
import { Auth } from './auth.model.js';

class AuthService {
  static async register({ userName, email, password }: RegisterUserDTO) {
    if (!password || !email || !userName)
      throw new CustomErrorHandler(400, 'Enter all fields complsary');

    const userExists = await Auth.exists({ email });
    if (userExists)
      throw new CustomErrorHandler(400, 'User already registered');

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await Auth.create({
      userName,
      email,
      password: hashedPassword,
      lastLogin: new Date().toISOString(),
    });

    return { id: user._id.toString(), email: user.email };
  }
}

export default AuthService;
