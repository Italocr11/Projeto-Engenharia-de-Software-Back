import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ReservationRepository } from './reservation.repository';
import { Reservation } from './reservation.entity';
// import { RentalHistoryRepository } from './rental-history.repository'; histórico de horarios marcados

@Injectable()
export class ReservationService {
  constructor(
    @InjectRepository(ReservationRepository)
    private reservationRepository: ReservationRepository,
  ) {}

  create(reservation: Partial<Reservation>): Promise<Reservation> {
    const newReservation = this.reservationRepository.create(reservation);
    return this.reservationRepository.save(newReservation);
  }

  findAll(): Promise<Reservation[]> {
    return this.reservationRepository.find();
  }

  findOne(id: number): Promise<Reservation> {
    return this.reservationRepository.findOne(id);
  }

  async update(id: number, reservation: Partial<Reservation>): Promise<Reservation> {
    await this.reservationRepository.update(id, reservation);
    return this.reservationRepository.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.reservationRepository.delete(id);
  }

async createReservation(reservation: Partial<Reservation>): Promise<Reservation> {
  const availabilities = await this.availabilityRepository.find({
    where: {
      courtId: reservation.courtId,
      isBlocked: false,
      startTime: LessThanOrEqual(reservation.startTime),
      endTime: MoreThanOrEqual(reservation.endTime),
    },
  });

  if (availabilities.length === 0) {
    throw new Error('No available slots for the given time');
  }

  const overlappingReservation = await this.reservationRepository.findOne({
    where: {
      courtId: reservation.courtId,
      startTime: LessThanOrEqual(reservation.endTime),
      endTime: MoreThanOrEqual(reservation.startTime),
    },
  });

  if (overlappingReservation) {
    throw new Error('Time slot already booked');
  }

  const newReservation = this.reservationRepository.create(reservation);
  return this.reservationRepository.save(newReservation);
}

  async create(reservation: Partial<Reservation>): Promise<Reservation> {
    if (!reservation.userId || !reservation.courtId || !reservation.startTime || !reservation.endTime) {
      throw new BadRequestException('Dados insuficientes para criar a reserva.');
    }

    const existingReservation = await this.reservationRepository.findOne({
      where: {
        courtId: reservation.courtId,
        startTime: reservation.startTime,
        endTime: reservation.endTime,
      },
    });

    if (existingReservation) {
      throw new BadRequestException('Este horário já está reservado.');
    }

    return await this.reservationRepository.manager.transaction(async (transactionalEntityManager) => {
      const newReservation = transactionalEntityManager.create(Reservation, reservation);
      const savedReservation = await transactionalEntityManager.save(newReservation);

      const rentalHistory = transactionalEntityManager.create(RentalHistory, {
        reservationId: savedReservation.id,
        userId: savedReservation.userId,
        courtId: savedReservation.courtId,
        startTime: savedReservation.startTime,
        endTime: savedReservation.endTime,
        createdAt: new Date(),
      });

      await transactionalEntityManager.save(rentalHistory);

      return savedReservation;
    });
  }


  async cancelReservation(id: number): Promise<void> {
    const reservation = await this.reservationRepository.findOne(id);
    if (!reservation) {
      throw new Error('Reservation not found');
    }

    //    await this.rentalHistoryRepository.update({ reservationId: id }, { });
    
    await this.reservationRepository.delete(id);

  }

}