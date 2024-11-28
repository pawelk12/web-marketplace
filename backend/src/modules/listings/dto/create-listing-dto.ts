import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsString()
  @IsNotEmpty()
  description: string;

  @IsIn(['new', 'used'])
  condition: 'new' | 'used';

  @IsNumber()
  @Transform(({ value }) => parseFloat(value))
  price: number;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  negotiable: boolean;
}
