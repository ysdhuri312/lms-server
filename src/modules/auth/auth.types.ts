/** @format */

export interface IAuth {
  _id: string;
  userName: string;
  email: string;
  password: string;
  provider?: 'local' | 'google';
  refreshToken?: string;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}
