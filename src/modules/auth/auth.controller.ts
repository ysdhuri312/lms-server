/** @format */

import asyncHandler from '../../handlers/asyncError.js';
import AuthService from './auth.service.js';

class AuthController {
  register = asyncHandler(async (req, res) => {
    const { fullName, email, password } = req.body;

    const result = await AuthService.register({ fullName, email, password });

    res
      .cookie('token', result.token, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        success: true,
        message: 'User register successfully',
        data: result.user,
      });
  });
}

export default AuthController;
