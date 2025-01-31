import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class RentalHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  reservationId: number;

  @Column()
  userId: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  createdAt: Date;
}
