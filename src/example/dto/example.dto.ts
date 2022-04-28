/**
 * Created by Rain on 2022/4/28
 */
import { Type } from 'class-transformer';
import {
  IsNotEmptyObject,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';

export class ExampleInternal {
  @IsString()
  name: string;
}

export class ExampleRequestDto {
  @IsNumber()
  id: number;
  @IsString()
  name: string;
  @IsNumber()
  age: number;

  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => ExampleInternal)
  internal: ExampleInternal;
}
