import { Module } from '@nestjs/common';
import { GiftsController } from './gifts.controller';
import { GiftsService } from './gifts.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { Gifts } from './gifts.model';

@Module({
  imports: [SequelizeModule.forFeature([Gifts])],
  controllers: [GiftsController],
  providers: [GiftsService],
  exports: [GiftsService],
})
export class GiftsModule {}
