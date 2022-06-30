import { NextFunction, Request, Response } from 'express';
import { ObjectSchema, ValidationError } from 'joi';
import { BadRequestException } from '../exceptions';

const validationMiddleware =
  (obj: ObjectSchema, place: 'body' | 'params' | 'query') =>
  async (req: Request, _res: Response, next: NextFunction) => {
    try {
      await obj.validateAsync(req[place], {
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

export { validationMiddleware };
