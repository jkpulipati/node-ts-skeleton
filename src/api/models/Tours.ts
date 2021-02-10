import { Column, Entity, ObjectIdColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';

@Entity()
export class Tours {

    @ObjectIdColumn()
    public id: string;

    @IsNotEmpty()
    @Column()
    public name: string;

    @IsNotEmpty()
    @Column()
    public summary: string;

    @IsNotEmpty()
    @Column()
    public description: string;

    @IsNotEmpty()
    @Column()
    public price: number;

    @IsNotEmpty()
    @Column()
    public maxGroupSize: number;
}
