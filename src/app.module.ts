import { join } from 'path';

import { ConfigModule, ConfigService } from '@donews/nestjs-config';
import { LoggerModule } from '@donews/nestjs-logger';
import { PromModule, PromModuleOptions } from '@donews/nestjs-prom';
import { Module } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import * as Joi from 'joi';

import { ApiValidationPipe } from './aop';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleModule } from './example/example.module';
import { MetricController, metrics } from './metric.controller';

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
    PromModule.forRootAsync(
      {
        useFactory(configService: ConfigService): PromModuleOptions {
          return {
            withDefaultsMetrics: true,
            defaultLabels: {
              app: configService.get('APP_NAME'),
              env: configService.get('APP_ENV'),
            },
          };
        },
        inject: [ConfigService],
      },
      metrics,
    ),

    ExampleModule,
  ],
  controllers: [AppController, MetricController],
  providers: [
    AppService,

    // 全局默认开启 参数校验
    {
      provide: APP_PIPE,
      useClass: ApiValidationPipe,
    },
  ],
})
export class AppModule {}
