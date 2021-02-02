import { EntityRepository, Repository } from 'typeorm';

import { Tours } from '../models/User';

@EntityRepository(Tours)
export class UserRepository extends Repository<Tours>  {

}
