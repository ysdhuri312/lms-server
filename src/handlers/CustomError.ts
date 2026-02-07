/** @format */

export class CustomErrorHandler extends Error {
  public source: string;
  public statusCode: number;

  constructor(statusCode: number, message: string, source: string = 'Unknown') {
    super(message);
    this.source = source;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
