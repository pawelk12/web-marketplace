import { Listing } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class DisplayListingsDto implements Listing {
  id: number;
  name: string;
  price: number;
  fileName: string;

  @Exclude()
  description: string;
  @Exclude()
  condition: string;
  @Exclude()
  negotiable: boolean;
  @Exclude()
  filePath: string;
  @Exclude()
  createdAt: Date;
  @Exclude()
  userId: number;
}
