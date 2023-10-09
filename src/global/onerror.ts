import { ArgumentsHost, ExceptionFilter, HttpException } from "@nestjs/common";
import { Request, Response } from "express";

export class ErrorHandler implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();
    const status = exception.getStatus();
    const exceptionRes = exception.getResponse();


    response.status(status).json({
      ...(typeof exceptionRes === 'object' ? exceptionRes : { message: exception }),
      success: false,
      time: new Date(),
      data: exception.message,
      status: 0,
      path: request.url
    });
  }
}