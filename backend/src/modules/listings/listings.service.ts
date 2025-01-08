import { Injectable } from '@nestjs/common';
import { CreateListingDto } from './dto/create-listing-dto';
import { PrismaService } from '../prisma/prisma.service';
import { EditListingDto } from './dto/edit-listing-dto';
import { promises as fs } from 'fs';
import { ListingNotModifiedException } from '../../exceptions/listing-not-modified-exception';
import { CheckCommonKeysEqual } from '../../utils/check-common-keys-equal';

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

  async addListing(
    data: CreateListingDto,
    filePath: string,
    fileName: string,
    userId: number,
  ) {
    return this.prisma.listing.create({
      data: {
        name: data.name,
        description: data.description,
        condition: data.condition,
        price: data.price,
        negotiable: data.negotiable,
        filePath: filePath,
        fileName: fileName,
        userId: userId,
      },
    });
  }

  async deleteById(id: number) {
    const fileToDelete = await this.prisma.listing.findUnique({
      where: {
        id: id,
      },
      select: {
        filePath: true,
      },
    });

    try {
      await fs.unlink(fileToDelete.filePath);
    } catch (error) {
      console.log(error);
    }

    return this.prisma.listing.delete({
      where: {
        id: id,
      },
    });
  }

  async editListing(
    id: number,
    data: EditListingDto,
    filePath?: string,
    fileName?: string,
  ) {
    if (Object.keys(data).length === 0 && !filePath) {
      throw new ListingNotModifiedException();
    }

    const oldListing = await this.prisma.listing.findUnique({
      where: {
        id: id,
      },
    });

    if (CheckCommonKeysEqual(oldListing, data) && !filePath) {
      throw new ListingNotModifiedException();
    }

    if (filePath) {
      const oldFile = await this.prisma.listing.findUnique({
        where: {
          id: id,
        },
        select: {
          filePath: true,
        },
      });
      try {
        await fs.unlink(oldFile.filePath);
      } catch (error) {
        console.log(error);
      }
    }

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
        fileName: fileName,
      },
    });
  }
}
