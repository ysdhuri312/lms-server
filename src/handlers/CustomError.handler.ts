/** @format */

export class CustomErrorHandler extends Error {
  public location: string;
  public statusCode: number;

  constructor(statusCode: number, message: string, location: string) {
    super(message);
    this.location = location;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
