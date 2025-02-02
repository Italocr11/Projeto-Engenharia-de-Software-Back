import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AvailabilityService } from './availability.service';
import { AvailabilityController } from './availability.controller';
import { Availability } from './availability.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Availability])],
  providers: [AvailabilityService],
  controllers: [AvailabilityController],
})
export class AvailabilityModule {}
