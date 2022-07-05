import { Request, Response } from 'express';
import { NotFoundException } from '../exceptions';

const notFoundMiddleware = (_req: Request, _res: Response) => {
  throw NotFoundException.create({ message: 'Route not found' });
};

export { notFoundMiddleware };
