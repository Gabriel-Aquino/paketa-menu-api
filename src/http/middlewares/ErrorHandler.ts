import { Request, Response, NextFunction } from 'express';
import AppError from '@shared/errors/AppError';
import { HttpStatus } from '@shared/utils/HttpStatus';

export class ErrorHandler {
  public static handle(err: Error, _: Request, response: Response, __: NextFunction) {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json(err.throwError());
    }

    console.error(err);

    return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      message: 'Internal Server Error',
    });
  }
}
