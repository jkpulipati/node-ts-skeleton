import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Tours {

    @PrimaryColumn('uuid')
    public id: string;

    @IsNotEmpty()
    @Column({ name: 'name' })
    public name: string;

    @IsNotEmpty()
    @Column({ name: 'description' })
    public description: string;

    @IsNotEmpty()
    @Column()
    public summary: string;

    @IsNotEmpty()
    @Column()
    public price: string;

}
