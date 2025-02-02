import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationService } from './reservation.service';
import { ReservationController } from './reservation.controller';
import { ReservationRepository } from './reservation.repository';
import { Reservation } from './reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Reservation, ReservationRepository])],
  providers: [ReservationService],
  controllers: [ReservationController],
})
export class ReservationModule {}
