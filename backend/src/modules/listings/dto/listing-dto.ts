import { Listing } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ListingDto implements Listing {
  name: string;
  @Exclude()
  id: number;
  description: string;
  condition: string;
  price: number;
  negotiable: boolean;
  @Exclude()
  filePath: string;
  fileName: string;
  createdAt: Date;
  userId: number;
}
