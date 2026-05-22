export default class AppError {
  public readonly message: string;

  public readonly statusCode: number;


  constructor(
    message: string,
    statusCode: number,
  ) {
    this.message = message;
    this.statusCode = statusCode;
  }

  public throwError() {
    return {
      message: this.message
    };
  }
}