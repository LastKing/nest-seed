/**
 * Created by Rain on 2022/4/28
 */
import { Module } from '@nestjs/common';

import { ExampleController } from './example.controller';

@Module({
  controllers: [ExampleController],
  providers: [],
})
export class ExampleModule {}
