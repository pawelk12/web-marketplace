import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing-dto';
import { PrismaService } from '../prisma/prisma.service';
import { EditListingDto } from './dto/edit-listing-dto';

@Injectable()
export class ListingsService {
  constructor(private readonly prisma: PrismaService) {}

  async listListings(sortAndFilter) {
    if (!sortAndFilter.sortBy) {
      return this.prisma.listing.findMany();
    } else {
      return this.prisma.listing.findMany({
        orderBy: {
          [sortAndFilter.sortBy]: sortAndFilter.sortOrder,
        },
      });
    }
  }

  async getListingById(id: number) {
    return this.prisma.listing.findUnique({
      where: {
        id: id,
      },
    });
  }

  async addListing(data: CreateListingDto, filePath: string) {
    return this.prisma.listing.create({
      data: {
        name: data.name,
        description: data.description,
        condition: data.condition,
        price: data.price,
        negotiable: data.negotiable,
        filePath: filePath,
      },
    });
  }

  async deleteById(id: number) {
    return this.prisma.listing.delete({
      where: {
        id: id,
      },
    });
  }

  async editListing(id: number, data: EditListingDto, filePath: string) {
    return this.prisma.listing.update({
      where: {
        id: id,
      },
      data: {
        name: data.name,
        description: data.description,
        condition: data.condition,
        price: data.price,
        negotiable: data.negotiable,
        filePath: filePath,
      },
    });
  }
}
