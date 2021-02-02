import { Type } from 'class-transformer';
import { IsNotEmpty, IsUUID, ValidateNested } from 'class-validator';
import {
    Body, Get, JsonController, OnUndefined, Param, Post, Req
} from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';

import { UserNotFoundError } from '../errors/UserNotFoundError';
import { Tours } from '../models/User';
import { UserService } from '../services/UserService';
import { PetResponse } from './PetController';

class BaseUser {
    @IsNotEmpty()
    public name: string;

    @IsNotEmpty()
    public summary: string;

    @IsNotEmpty()
    public description: string;

    @IsNotEmpty()
    public price: string;
}

export class UserResponse extends BaseUser {
    @IsUUID()
    public id: string;

    @ValidateNested({ each: true })
    @Type(() => PetResponse)
    public pets: PetResponse[];
}

class CreateUserBody extends BaseUser {
    @IsNotEmpty()
    public password: string;
}

@JsonController('/users')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class UserController {

    constructor(
        private userService: UserService
    ) { }

    @Get()
    @ResponseSchema(UserResponse, { isArray: true })
    public find(): Promise<Tours[]> {
        return this.userService.find();
    }

    @Get('/me')
    @ResponseSchema(UserResponse, { isArray: true })
    public findMe(@Req() req: any): Promise<Tours[]> {
        return req.user;
    }

    @Get('/:id')
    @OnUndefined(UserNotFoundError)
    @ResponseSchema(UserResponse)
    public one(@Param('id') id: string): Promise<Tours | undefined> {
        return this.userService.findOne(id);
    }

    @Post()
    @ResponseSchema(UserResponse)
    public create(@Body() body: CreateUserBody): Promise<Tours> {
        const user = new Tours();
        user.name = body.name;
        user.description = body.description;
        user.summary = body.summary;
        user.price = body.price;

        return this.userService.create(user);
    }

    // @Put('/:id')
    // @ResponseSchema(UserResponse)
    // public update(@Param('id') id: string, @Body() body: BaseUser): Promise<Tour> {
    //     const user = new User();
    //     user.email = body.email;
    //     user.firstName = body.firstName;
    //     user.lastName = body.lastName;
    //     user.username = body.username;

    //     return this.userService.update(id, user);
    // }

    // @Delete('/:id')
    // public delete(@Param('id') id: string): Promise<void> {
    //     return this.userService.delete(id);
    // }

}
