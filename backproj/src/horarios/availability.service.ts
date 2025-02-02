import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Availability } from './availability.entity';

@Injectable()
export class AvailabilityService {
  constructor(
    @InjectRepository(Availability)
    private availabilityRepository: Repository<Availability>,
  ) {}

  create(availability: Partial<Availability>): Promise<Availability> {
    const newAvailability = this.availabilityRepository.create(availability);
    return this.availabilityRepository.save(newAvailability);
  }

  async block(id: number): Promise<Availability> {
    const availability = await this.availabilityRepository.findOne(id);
    if (availability) {
      availability.isBlocked = true;
      return this.availabilityRepository.save(availability);
    }
    throw new Error('Availability not found');
  }
}
