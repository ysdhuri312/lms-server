/** @format */

import type { Request } from 'express';
import asyncHandler from '../../handlers/asyncError.js';
import AuthService from './auth.service.js';
import type { LoginUserDTO, RegisterUserDTO } from './auth.dto.js';
import { CustomErrorHandler } from '../../handlers/CustomError.js';
import { env } from '../../config/env.js';

class AuthController {
  static register = asyncHandler(
    async (req: Request<{}, {}, RegisterUserDTO>, res) => {
      const { fullName, email, password } = req.body || {};

      if (!password || !email || !fullName)
        throw new CustomErrorHandler(400, 'Enter all fields complsary');

      const result = await AuthService.register({ fullName, email, password });

      res
        .cookie('token', result.token, {
          httpOnly: true,
          secure: env.NODE_ENV === 'production',
          sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(201)
        .json({
          success: true,
          message: `Welcome ${result.user.fullName}`,
          data: result.user,
        });
    },
  );

  static login = asyncHandler(
    async (req: Request<{}, {}, LoginUserDTO>, res) => {
      const { email, password } = req.body || {};

      if (!email || !password)
        throw new CustomErrorHandler(400, 'Enter all fields complsary');

      const result = await AuthService.login({ email, password });

      res
        .cookie('token', result.token, {
          httpOnly: true,
          secure: env.NODE_ENV === 'production',
          sameSite: env.NODE_ENV === 'production' ? 'none' : 'lax',
          maxAge: 7 * 24 * 60 * 60 * 1000,
        })
        .status(202)
        .json({
          success: true,
          message: `Welcome ${result.user.fullName}`,
          data: result.user,
        });
    },
  );

  static logout = asyncHandler((_req, res) => {
    res
      .clearCookie('token', {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
      })
      .status(200)
      .json({
        success: true,
        message: 'Logged out successfully',
      });
  });
}

export default AuthController;
