import { NextFunction, Request, Response } from 'express';
import { HttpException, InternalServerErrorException } from '../exceptions';

const errorHandlerMiddleware = (
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof HttpException) {
    res
      .status(err.statusCode)
      .json({
        statusCode: err.statusCode,
        message: err.message,
        details: err.data,
      })
      .end();
  } else {
    console.error(err);

    errorHandlerMiddleware(
      InternalServerErrorException.create(),
      _req,
      res,
      _next
    );
  }
};

export { errorHandlerMiddleware };
