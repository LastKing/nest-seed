import { ConfigService } from '@donews/nestjs-config';
import { LOGGER } from '@donews/nestjs-logger';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
  const NODE_ENV = process.env.NODE_ENV;
  let isNestCoreLogEnv: undefined | false = process.env.NODE_NEST_CORE_LOG
    ? undefined
    : false;
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

  const config = new DocumentBuilder()
    .setTitle('Seed example')
    .setDescription('The seed API description')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  await app.listen(configService.get('PORT'));
}
bootstrap();
