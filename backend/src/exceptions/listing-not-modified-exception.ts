import { HttpException, HttpStatus } from '@nestjs/common';

export class ListingNotModifiedException extends HttpException {
  constructor() {
    super('No changes have been made to the listing', HttpStatus.BAD_REQUEST);
  }
}
