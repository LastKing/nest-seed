import { LOGGER, LoggerInterface } from '@donews/nestjs-logger';
import { Controller, Get, Inject } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
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
