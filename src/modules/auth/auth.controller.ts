/** @format */

import asyncHandler from '../../handlers/asyncError.js';
import AuthService from './auth.service.js';

class AuthController {
  register = asyncHandler(async (req, res) => {
    const { userName, email, password } = req.body;

    const user = await AuthService.register({ userName, email, password });

    res.status(201).json({
      success: true,
      message: 'User register successfully',
      data: { user },
    });
  });
}

export default AuthController;
