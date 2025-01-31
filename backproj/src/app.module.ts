// app.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationModule } from './reservation/reservation.module';
import { AvailabilityModule } from './availability/availability.module';
import { RentalHistoryModule } from './rental-history/rental-history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      // Configuração do banco de dados
    }),
    ReservationModule,
    AvailabilityModule,
    RentalHistoryModule
  ],
})
export class AppModule {}
