import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { ListingsService } from './listings.service';
import { FileInterceptor } from '@nestjs/platform-express';
import * as multer from 'multer';
import { CreateListingDto } from './dto/create-listing-dto';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';
import { promises as fs } from 'fs';
import { ListingNotFoundException } from '../../exceptions/listing-not-found-exception';
import { EditListingDto } from './dto/edit-listing-dto';
import { SortFilterListingDto } from './dto/sort-filter-listing-dto';
import { TokenGuard } from '../auth/token.guard';
import { UserID } from '../auth/user.decorator';
import { plainToInstance } from 'class-transformer';
import { ListingDto } from './dto/listing-dto';
import { DisplayListingsDto } from './dto/display-listings-dto';
import { AuthorGuard } from './author.guard';

@Controller('listings')
export class ListingsController {
  constructor(private listingsService: ListingsService) {}

  @Get()
  @UseGuards(TokenGuard)
  async listListings(@Query() sortAndFilter: SortFilterListingDto) {
    const listings = await this.listingsService.listListings(sortAndFilter);
    return plainToInstance(DisplayListingsDto, listings);
  }

  // chce zeby uzytkownik ktory jest autorem jak wejdzie to mial wypelniony formularz i mogl sobie edytowac to ogloszenie
  @Get(':id')
  @UseGuards(TokenGuard)
  async getListing(@Param('id', ParseIntPipe) id: number) {
    const listing = await this.listingsService.getListingById(id);
    if (!listing) {
      throw new ListingNotFoundException();
    }
    return plainToInstance(ListingDto, listing);
  }

  @Get(':id/permission')
  @UseGuards(TokenGuard, AuthorGuard)
  async getPermission(@Param('id', ParseIntPipe) id: number) {}

  @Post()
  @UseGuards(TokenGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.memoryStorage(),
    }),
  )
  async createListing(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/',
        })
        .addMaxSizeValidator({
          maxSize: 2000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
    @Body() data: CreateListingDto,
    @UserID() userId: number,
  ) {
    const uniqueFileName = `${uuidv4()}-${file.originalname}`;

    const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads'); // Folder "uploads"
    const filePath = path.join(uploadDir, uniqueFileName);

    await fs.mkdir(uploadDir, { recursive: true });

    await fs.writeFile(filePath, file.buffer);
    const listing = await this.listingsService.addListing(
      data,
      filePath,
      uniqueFileName,
      userId,
    );
    return plainToInstance(ListingDto, listing);
  }

  @Delete(':id')
  @UseGuards(TokenGuard, AuthorGuard)
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteListing(@Param('id', ParseIntPipe) id: number) {
    const listing = await this.listingsService.getListingById(id);
    if (!listing) {
      throw new ListingNotFoundException();
    }
    await this.listingsService.deleteById(id);
  }

  @Put(':id')
  @UseGuards(TokenGuard, AuthorGuard)
  @UseInterceptors(
    FileInterceptor('image', {
      storage: multer.memoryStorage(),
    }),
  )
  async editListing(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'image/',
        })
        .addMaxSizeValidator({
          maxSize: 2000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File | undefined,
    @Body() data?: EditListingDto,
  ) {
    const listing = await this.listingsService.getListingById(id);
    if (!listing) {
      throw new ListingNotFoundException();
    }

    if (file) {
      const uniqueFileName = `${uuidv4()}-${file.originalname}`;

      const uploadDir = path.join(__dirname, '..', '..', '..', 'uploads'); // directory "uploads"
      const filePath = path.join(uploadDir, uniqueFileName);

      await fs.mkdir(uploadDir, { recursive: true });

      await fs.writeFile(filePath, file.buffer);

      const listing = await this.listingsService.editListing(
        id,
        data,
        filePath,
        uniqueFileName,
      );
      return plainToInstance(ListingDto, listing);
    }

    return this.listingsService.editListing(id, data);
  }
}
