export default class HttpException extends Error {
  statusCode: number;
  message: string;
  data: Record<string, any>;

  constructor({
    statusCode,
    message,
    data,
  }: {
    statusCode: number;
    message: string;
    data?: any;
  }) {
    super(message);
    this.statusCode = statusCode;
    this.data = data;
  }
}
