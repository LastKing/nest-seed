import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Histogram } from 'prom-client';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

/**
 * 对controller 进行每个 路由进行 Histogram 监控
 */
@Injectable()
export class MetricHistogramInterceptor implements NestInterceptor {
  constructor(
    @Inject('spreader_request_histogram')
    private readonly requestHistogram: Histogram<string>,
  ) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const end = this.requestHistogram.startTimer();
    const controller = context.getClass().name;
    const handler = context.getHandler().name;
    return next.handle().pipe(
      tap(() => {
        end({ controller, handler });
      }),
      catchError((err) => {
        end({ controller, handler });
        return throwError(err);
      }),
    );
  }
}
