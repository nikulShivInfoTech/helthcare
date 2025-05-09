import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ResponseData } from '../utility/constants/response';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapter) {}

  catch(exception: any, host: ArgumentsHost): void {
    console.log('exception', exception);

    const ctx = host.switchToHttp();
    ctx.getRequest();

    let httpStatus =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    httpStatus = exception['statusCode'] ? exception['statusCode'] : httpStatus;

    exception['name'];
    let exMessage = exception['message'];
    let exResponse;
    if (exception instanceof HttpException) {
      exResponse = exception.getResponse();

      if (exResponse?.trace && exResponse.trace.length > 0) {
        exResponse.trace;
      }
      if (exResponse?.message && exResponse.message.length > 0) {
        exMessage = exResponse.message;
      }
      if (exResponse?.data) {
        exResponse.data;
      }
    } else {
      exception;
    }

    const responseBody = {
      statusCode: httpStatus,
      status: ResponseData.ERROR,
      message: exMessage,
    };

    this.httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
