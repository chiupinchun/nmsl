import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Observable, map } from "rxjs";

interface ResponseFormat<T> {
  data: T;
  status: number;
  success: boolean;
  message: string;
}
@Injectable()
export class Response<T> implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<T & {
      dataList?: T;
      totalRecord?: number;
      totalPage?: number;
    }>
  ): Observable<ResponseFormat<T>> | Promise<Observable<ResponseFormat<T>>> {
    return next.handle().pipe(map(dataMightWithCount => {
      // const result = Array.isArray(dataMightWithCount) && dataMightWithCount.length ? {
      //   data: dataMightWithCount[0],
      //   totalRecord: dataMightWithCount[1],
      //   totalPage: dataMightWithCount[2]
      // } : {
      //   data: dataMightWithCount
      // };
      // return Object.assign(result, {
      //   status: 1,
      //   message: '成功',
      //   success: true
      // });
      const format = {
        status: 1,
        message: '成功',
        success: true
      };
      if (dataMightWithCount.dataList) {
        return {
          ...format,
          data: dataMightWithCount.dataList,
          totalRecord: dataMightWithCount.totalRecord,
          totalPage: dataMightWithCount.totalPage
        };
      }
      return { ...format, data: dataMightWithCount };
    }));
  }
}