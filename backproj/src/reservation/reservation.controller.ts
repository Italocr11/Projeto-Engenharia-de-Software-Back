import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { ReservationService } from './reservation.service';
import { Reservation } from './reservation.entity';

@Controller('reservations')
export class ReservationController {
  constructor(private readonly reservationService: ReservationService) {}

  @Post()
  create(@Body() reservation: Partial<Reservation>): Promise<Reservation> {
    return this.reservationService.create(reservation);
  }

  @Get()
  findAll(): Promise<Reservation[]> {
    return this.reservationService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Reservation> {
    return this.reservationService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() reservation: Partial<Reservation>): Promise<Reservation> {
    return this.reservationService.update(id, reservation);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.reservationService.remove(id);
  }

  @Delete(':id')
  cancel(@Param('id') id: number): Promise<void> {
    return this.reservationService.cancelReservation(id);
  }
}
