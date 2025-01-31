import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RentalHistoryService } from './hist.service';
import { RentalHistoryController } from './hist.controller';
import { RentalHistoryRepository } from './hist.repository';
import { RentalHistory } from './hist.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RentalHistory, RentalHistoryRepository])],
  providers: [RentalHistoryService],
  controllers: [RentalHistoryController],
})
export class RentalHistoryModule {}
