import {
  IsBoolean,
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateListingDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(5, {
    message:
      'The item name is too short. Minimal length is $constraint1 characters.',
  })
  @MaxLength(50, {
    message:
      'The item name is too long. Maximal length is $constraint1 characters.',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(100, {
    message:
      'The item description is too short. Minimal length is $constraint1 characters.',
  })
  @MaxLength(1000, {
    message:
      'The item description is too long. Maximal length is $constraint1 characters.',
  })
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
