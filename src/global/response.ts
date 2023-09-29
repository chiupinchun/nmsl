import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

interface ResponseFormat<T> {
  data: T;
  status: number;
  success: boolean;
  msg: string;
}
@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>
  ): Observable<ResponseFormat<T>> | Promise<Observable<ResponseFormat<T>>> {
    return next.handle().pipe(map(data => ({
      data,
      status: 0,
      msg: '成功',
      success: true
    })));
  }
}