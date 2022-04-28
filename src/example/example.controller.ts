/**
 * Created by Rain on 2022/4/28
 */
import { Body, Controller, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ExampleRequestDto, ExampleResponseDto } from './dto';

@ApiTags('example')
@Controller('/example')
export class ExampleController {
  @ApiOperation({ summary: 'hello' })
  @ApiResponse({ status: 200, description: 'ok', type: ExampleResponseDto })
  @Post('/hello')
  hello(@Body() body: ExampleRequestDto): ExampleResponseDto {
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
