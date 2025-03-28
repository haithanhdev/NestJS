import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable } from 'rxjs'
import { tap } from 'rxjs/operators'

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    //Đoạn code xử lí trước khi controller chạy
    console.log('Before...')

    const now = Date.now()
    return next.handle().pipe(
      tap(() => {
        //Đoạn code xử lí sau khi controller chạy
        console.log(`After... ${Date.now() - now}ms`)
      }),
    )
  }
}
