import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingNotFoundException } from '../../exceptions/listing-not-found-exception';

@Injectable()
export class AuthorGuard implements CanActivate {
  constructor(private readonly listingService: ListingsService) {}
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const userId = request.userId;
    const listingId = parseInt(request.params.id);
    try {
      const { userId: authorId } =
        await this.listingService.getListingAuthorId(listingId);
      return userId === authorId;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      throw new ListingNotFoundException();
    }
  }
}
