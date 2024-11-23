import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/CreateListingDto';

@Injectable()
export class ListingsService {
  addListing(data: CreateListingDto, filePath: string) {
    console.log(filePath);
    console.log(typeof data.price);
    return data;
  }
}
