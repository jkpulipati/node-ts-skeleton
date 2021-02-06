import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Tours {

    @PrimaryGeneratedColumn()
    public id: string;

    @Column()
    public name: string;

    @Column()
    public summary: string;

    @Column()
    public description: string;

    @Column()
    public price: number;

    @Column()
    public maxGroupSize: number;
}
