/**
 * Created by Rain on 2022/4/28
 */
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ExampleInternal {
  @ApiProperty({ name: 'name', description: 'name' })
  @IsString()
  name: string;
}

export class ExampleRequestDto {
  @ApiProperty({ name: 'id', description: 'id', type: Number })
  @IsNumber()
  id: number;
  @ApiProperty({ name: 'name', description: 'name', type: String })
  @IsString()
  name: string;
  @ApiProperty({ name: 'age', description: '年龄', type: Number })
  @IsNumber()
  age: number;

  @ApiProperty({
    name: 'internal',
    description: '内部对象',
    type: ExampleInternal,
  })
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ExampleInternal)
  internal: ExampleInternal;
}

export class ExampleResponseData {
  @ApiProperty({ name: 'id', description: 'id', type: Number })
  @IsNumber()
  id: number;
  @ApiProperty({ name: 'name', description: 'name', type: String })
  @IsString()
  name: string;
  @ApiProperty({ name: 'age', description: '年龄', type: Number })
  @IsNumber()
  age: number;
}

export class ExampleResponseDto {
  @ApiProperty({ name: 'code', description: '返回码', type: Number })
  code: number;
  @ApiProperty({ name: 'message', description: 'message', type: String })
  message: string;
  @ApiProperty({ name: 'data', description: 'data', type: ExampleResponseData })
  data: ExampleResponseData;
}
