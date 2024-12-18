import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ListingsModule } from './modules/listings/listings.module';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
  imports: [ListingsModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
