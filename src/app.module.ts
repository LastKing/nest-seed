import { join } from 'path';

import { ConfigModule, ConfigService } from '@donews/nestjs-config';
import { LoggerModule } from '@donews/nestjs-logger';
import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(
        process.cwd(),
        `./config/${process.env.NODE_ENV || 'development'}.yaml`,
      ),
      validationSchema: Joi.object({
        APP_NAME: Joi.string().required(),
        APP_ENV: Joi.string().required(),
        PORT: Joi.number().required(),
        LOGGER: Joi.string().required(),
        LOG_LEVEL: Joi.string().required(),
      }),
    }),
    LoggerModule.forRootAsync({
      useFactory(configService: ConfigService) {
        return {
          loggerType: configService.get('LOGGER'),
          loggerLevel: configService.get('LOG_LEVEL'),
          context: configService.get('APP_NAME'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
