import { IsEnum, IsOptional } from 'class-validator';

export class SortFilterListingDto {
  //FILTER
  // category types file
  // category?: string;
  // priceMin, priceMax

  //SORT
  @IsOptional()
  @IsEnum(['price', 'createdAt'])
  sortBy?: string;

  @IsOptional()
  @IsEnum(['desc', 'asc'])
  sortOrder?: 'desc' | 'asc' = 'desc';
}
