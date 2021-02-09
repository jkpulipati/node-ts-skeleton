import { Body, Get, JsonController, Post } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
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
    @ResponseSchema(Tours)
    public create(@Body() body: Tours): Promise<Tours> {
        let tour = new Tours();
        // tour.id = uuid.v1();
        tour = {...tour, ...body};
        console.log(tour);

        return this.toursService.create(tour);
    }
}
