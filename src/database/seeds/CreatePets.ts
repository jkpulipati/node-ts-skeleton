import { Connection } from 'typeorm';
import { Factory, Seeder, times } from 'typeorm-seeding';

import { Tours } from '../../../src/api/models/User';

export class CreatePets implements Seeder {

    public async run(factory: Factory, connection: Connection): Promise<any> {
        const em = connection.createEntityManager();
        await times(10, async (n) => {
            const user = await factory(Tours)().make();
            return await em.save(user);
        });
    }

}
