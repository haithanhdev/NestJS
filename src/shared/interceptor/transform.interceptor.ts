import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

export interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
    //Đoạn code xử lí trước khi controller chạy

    return next.handle().pipe(
      map((data) => {
        //Đoạn code xử lí sau khi controller chạy xong
        const ctx = context.switchToHttp()
        const response = ctx.getResponse()
        const statusCode = response.statusCode
        return {
          data,
          statusCode,
        }
      }),
    )
  }
}
