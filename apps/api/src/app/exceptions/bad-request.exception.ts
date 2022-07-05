import HttpException from './http.exception';

export default class BadRequestException extends HttpException {
  static create({
    statusCode = 400,
    message = 'Bad request',
    data,
  }: {
    statusCode?: number;
    message?: string;
    data?: any;
  } = {}) {
    return new BadRequestException({
      statusCode,
      message,
      data,
    });
  }
}
