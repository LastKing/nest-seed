import { LOGGER } from '@donews/nestjs-logger';
import { ConfigService } from '@donews/nestjs-config';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap() {
  const NODE_ENV = process.env.NODE_ENV;
  const nestCoreLog = !NODE_ENV || /^dev/.test(NODE_ENV) ? undefined : false;

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: nestCoreLog,
  });
  const logger = app.get(LOGGER);
  app.useLogger(logger);

  const configService: ConfigService = app.get(ConfigService);
  logger.setLogLevel(configService.get('LOG_LEVEL'));

  await app.listen(configService.get('PORT'));
}
bootstrap();
