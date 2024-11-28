import { NotFoundException } from '@nestjs/common';

export class ListingNotFoundException extends NotFoundException {
  constructor() {
    super('Listing not found');
  }
}
