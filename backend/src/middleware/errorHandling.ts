import { Request, Response, NextFunction } from 'express';
import { SendResponse } from '../controllers/SendResponse';

export default function errorHandling(
  error: any,
  request: Request,
  response: Response,
  next: NextFunction,
) {
  return SendResponse(response, [], error.message || 'UnknownError', 500);
}
