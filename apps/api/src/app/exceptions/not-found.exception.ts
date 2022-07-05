import HttpException from './http.exception';

export default class NotFoundException extends HttpException {
  static create({
    statusCode = 404,
    message = 'Not found',
    data,
  }: {
    statusCode?: number;
    message?: string;
    data?: any;
  } = {}) {
    return new NotFoundException({
      statusCode,
      message,
      data,
    });
  }
}
