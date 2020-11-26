import { ConfigService } from '@donews/nestjs-config';
import { LOGGER } from '@donews/nestjs-logger';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const NODE_ENV = process.env.NODE_ENV;
  let isNestCoreLogEnv = process.env.NODE_NEST_CORE_LOG ? undefined : false;
  if (!NODE_ENV || /^dev/.test(NODE_ENV)) {
    isNestCoreLogEnv = undefined;
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: isNestCoreLogEnv,
  });
  const logger = app.get(LOGGER);
  app.useLogger(logger);

  const configService: ConfigService = app.get(ConfigService);
  logger.setLogLevel(configService.get('LOG_LEVEL'));

  await app.listen(configService.get('PORT'));
}
bootstrap();
