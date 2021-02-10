import { Body, Get, JsonController, Post } from 'routing-controllers';
import { OpenAPI } from 'routing-controllers-openapi';
// import uuid from 'uuid';
import { Tours } from '../models/Tours';
import { ToursService } from '../services/ToursService';

@JsonController('/tours')
@OpenAPI({ security: [{ basicAuth: [] }] })
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
        // tour.id = uuid.v1();
        tour.name = body.name;
        tour.summary = body.summary;
        tour.description = body.description;
        tour.price = body.price;
        tour.maxGroupSize = body.maxGroupSize;
        console.log(tour);

        return this.toursService.create(tour);
    }
}
