/**
 * Created by Rain on 2020/10/30
 */
import {
  MetricType,
  MetricTypeConfigurationInterface,
  MetricTypeHistogram,
} from '@donews/nestjs-prom';
import { Controller, Get, Header } from '@nestjs/common';
import { Registry } from 'prom-client';

@Controller('/metrics')
export class MetricController {
  constructor(private readonly registry: Registry) {}

  @Get()
  @Header('Content-Type', 'text/plain; version=0.0.4; charset=utf-8')
  get(): string {
    return this.registry.metrics();
  }
}

export const metrics: MetricTypeConfigurationInterface[] = [
  {
    type: MetricType.Histogram,
    configuration: {
      name: 'spreader_request_histogram',
      help: 'spreader request histogram',
      labelNames: ['controller', 'handler'],
    },
  } as MetricTypeHistogram,
  {
    type: MetricType.Histogram,
    configuration: {
      name: 'spreader_tb_api_request_histogram',
      help: 'spreader tb api request',
      labelNames: ['method', 'status', 'code'],
    },
  } as MetricTypeHistogram,
];
