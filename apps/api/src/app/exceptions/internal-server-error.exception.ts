import HttpException from './http.exception';

export default class InternalServerErrorException extends HttpException {
  static create({
    statusCode = 500,
    message = 'Server error',
    data,
  }: {
    statusCode?: number;
    message?: string;
    data?: any;
  } = {}) {
    return new InternalServerErrorException({
      statusCode,
      message,
      data,
    });
  }
}
