import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Tours } from '../models/Tours';
import { ToursRepository } from '../repositories/ToursRepository';

@Service()
export class ToursService {

    constructor(
        @OrmRepository() private toursRepository: ToursRepository,
        @Logger(__filename) private log: LoggerInterface
    ) {

    }

    public find(): Promise<Tours[]> {
        this.log.info('Find all tours');
        return this.toursRepository.find();
    }

    public async create(tour: Tours): Promise<Tours> {
        this.log.info('Create a new tour => ', tour.toString());
        const newTour = await this.toursRepository.save(tour);
        return newTour;
    }

}
