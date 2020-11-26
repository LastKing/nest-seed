import { LOGGER, LoggerInterface } from '@donews/nestjs-logger';
import { Controller, Get, Inject, UseInterceptors } from '@nestjs/common';

import { MetricHistogramInterceptor } from './aop';
import { AppService } from './app.service';

@Controller()
@UseInterceptors(MetricHistogramInterceptor)
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject(LOGGER) private readonly loggerService: LoggerInterface,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
