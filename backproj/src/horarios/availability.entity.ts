import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Availability {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  courtId: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column({ default: false })
  isBlocked: boolean;
}
