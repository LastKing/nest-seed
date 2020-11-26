import { LOGGER, LoggerInterface } from '@donews/nestjs-logger';
import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(@Inject(LOGGER) private readonly logger: LoggerInterface) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const controller = context.getClass().name;
    const handler = context.getHandler().name;
    const req = context.switchToHttp().getRequest();
    req.logger = this.logger;
    this.logger.verbose(JSON.stringify(req.originalUrl), 'HTTP_URL');
    this.logger.verbose(JSON.stringify(req.body), 'HTTP_REQUEST_BODY');
    return next.handle().pipe(
      tap((data) => {
        this.logger.verbose(JSON.stringify(data), 'HTTP_RESPONSE_BODY');
        this.logger.verbose(
          `requests served @ ${controller}.${handler}`,
          'RequestLoggingInterceptor',
        );
      }),
    );
  }
}
