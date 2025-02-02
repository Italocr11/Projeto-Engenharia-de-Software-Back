
import { Controller, Post, Body, Put, Param } from '@nestjs/common';
import { AvailabilityService } from './availability.service';
import { Availability } from './availability.entity';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly availabilityService: AvailabilityService) {}

  @Post()
  create(@Body() availability: Partial<Availability>): Promise<Availability> {
    return this.availabilityService.create(availability);
  }

  @Put(':id/block')
  block(@Param('id') id: number): Promise<Availability> {
    return this.availabilityService.block(id);
  }
}
