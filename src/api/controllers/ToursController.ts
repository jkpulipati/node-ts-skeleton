import { Body, Get, JsonController, Post } from 'routing-controllers';
import uuid from 'uuid';
import { Tours } from '../models/Tours';
import { ToursService } from '../services/ToursService';

@JsonController('/tours')
export class ToursController {

    constructor(
        private toursService: ToursService
    ) {

    }

    @Get()
    public find(): Promise<Tours[]> {
        return this.toursService.find();
    }

    @Post()
    public create(@Body() body: Tours): Promise<Tours> {
        const tour = new Tours();
        tour.id = uuid.v1();
        tour.name = body.name;
        tour.summary = body.summary;
        tour.description = body.description;
        tour.price = body.price;
        tour.maxGroupSize = body.maxGroupSize;
        return this.toursService.create(tour);
    }
}
