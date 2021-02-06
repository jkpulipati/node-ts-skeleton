import { EntityRepository, Repository } from 'typeorm';
import { Tours } from '../models/Tours';

@EntityRepository(Tours)
export class ToursRepository extends Repository<Tours> {

}
