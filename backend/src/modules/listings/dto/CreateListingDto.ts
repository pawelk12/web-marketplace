import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumberString,
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

  // @Transform(({ value }) => parseFloat(value))
  // @IsNumber()
  @IsNumberString()
  price: string;

  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  negotiable: boolean;
}
