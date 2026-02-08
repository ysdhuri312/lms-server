/** @format */

export interface RegisterUserDTO {
  fullName: string;
  email: string;
  password: string;
}

export interface LoginUserDTO {
  email: string;
  password: string;
}
