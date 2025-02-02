import { EntityRepository, Repository } from 'typeorm';
import { RentalHistory } from './hist.entity';

@EntityRepository(RentalHistory)
export class RentalHistoryRepository extends Repository<RentalHistory> {}
