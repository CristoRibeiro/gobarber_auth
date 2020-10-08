import { Request, Response, NextFunction } from 'express';
import AppError from '../errors/AppError';

function exceptionMiddlewares(
  error: Error,
  request: Request,
  response: Response,
  _: NextFunction,
): any {
  if (error instanceof AppError) {
    return response
      .status(error.status)
      .json({ status: 'error', error: error.message });
  }
  return response
    .status(500)
    .json({ status: 'error', error: `Internal server error ${error.message}` });
}

export default exceptionMiddlewares;
