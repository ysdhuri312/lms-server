/** @format */

export class CustomErrorHandler extends Error {
  public source: string;
  public statusCode: number;

  constructor(
    statusCode: number = 500,
    message: string = 'Internal server error',
    source: string = 'Unknown',
  ) {
    super(message);
    this.source = source;
    this.statusCode = statusCode;

    Error.captureStackTrace(this, this.constructor);
  }
}
