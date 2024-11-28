import { Module } from '@nestjs/common';
import { ListingsService } from './listings.service';
import { ListingsController } from './listings.controller';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  providers: [ListingsService],
  controllers: [ListingsController],
  imports: [PrismaModule],
})
export class ListingsModule {}
