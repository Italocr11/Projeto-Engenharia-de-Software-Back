import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RentalHistoryRepository } from './hist.repository';
import { RentalHistory } from './hist.entity';

@Injectable()
export class RentalHistoryService {
  constructor(
    @InjectRepository(RentalHistoryRepository)
    private rentalHistoryRepository: RentalHistoryRepository,
  ) {}

  findAll(): Promise<RentalHistory[]> {
    return this.rentalHistoryRepository.find();
  }

  findByUser(userId: number): Promise<RentalHistory[]> {
    return this.rentalHistoryRepository.find({ where: { userId } });
  }
}
