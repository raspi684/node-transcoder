import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, ValidationError } from 'joi';
import { BadRequestException } from '../exceptions';

const handle = async (
  req: Request,
  next: NextFunction,
  validationSchema: ObjectSchema,
  place: 'body' | 'params' | 'query'
) => {
  try {
    await validationSchema.validateAsync(req[place], {
      abortEarly: false,
      allowUnknown: false,
    });

    return next();
  } catch (error) {
    if (error instanceof ValidationError) {
      throw BadRequestException.create({
        message: 'Validation failed',
        data: error.details.map((i) => i.message),
      });
    } else {
      throw error;
    }
  }
};

function validationMiddleware(
  validationSchema: ObjectSchema,
  place: 'body' | 'params' | 'query'
) {
  return function (req: Request, _res: Response, next: NextFunction) {
    return handle(req, next, validationSchema, place);
  };
}

export { validationMiddleware };
