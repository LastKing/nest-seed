/**
 * Created by Rain on 2022/4/28
 */
import { Body, Controller, Post } from '@nestjs/common';

import { ExampleRequestDto } from './dto';

@Controller('/example')
export class ExampleController {
  @Post('/hello')
  hello(@Body() body: ExampleRequestDto): any {
    return {
      code: 0,
      message: 'success',
      data: {
        id: body.id,
        name: body.name,
        age: body.age,
      },
    };
  }
}
