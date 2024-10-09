import { Response } from 'express';

export function SendResponse(
  response: Response,
  result: any,
  statusCode: number = 500,
): Response {
  if (statusCode >= 200 && statusCode < 300) {
    return response.status(statusCode).json({
      result: result,
    });
  } else {
    return response.status(statusCode).json({
      errors: result,
    });
  }
}
