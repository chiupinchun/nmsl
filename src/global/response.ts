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
    return next.handle().pipe(map(dataMightWithCount => {
      const result = Array.isArray(dataMightWithCount) ? {
        data: dataMightWithCount[0],
        totalRecord: dataMightWithCount[1],
        totalPage: dataMightWithCount[2]
      } : {
        data: dataMightWithCount
      };
      return Object.assign(result, {
        status: 1,
        msg: '成功',
        success: true
      });
    }));
  }
}