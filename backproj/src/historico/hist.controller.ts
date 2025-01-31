import { Controller, Get, Param } from '@nestjs/common';
import { RentalHistoryService } from './hist.service';
import { RentalHistory } from './hist.entity';

@Controller('rental-history')
export class RentalHistoryController {
  constructor(private readonly rentalHistoryService: RentalHistoryService) {}

  @Get()
  findAll(): Promise<RentalHistory[]> {
    return this.rentalHistoryService.findAll();
  }

  @Get('user/:userId')
  findByUser(@Param('userId') userId: number): Promise<RentalHistory[]> {
    return this.rentalHistoryService.findByUser(userId);
  }
}
