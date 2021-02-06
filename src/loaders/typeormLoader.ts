import { MicroframeworkLoader, MicroframeworkSettings } from 'microframework-w3tec';
import { createConnection, getConnectionOptions } from 'typeorm';

import { env } from '../env';

export const typeormLoader: MicroframeworkLoader = async (settings: MicroframeworkSettings | undefined) => {

    const loadedConnectionOptions = await getConnectionOptions();
    const connectionOptions = Object.assign(loadedConnectionOptions, {
        type: env.db.type as any, // See createConnection options for valid types
        url: env.db.url,
        entities: env.app.dirs.entities,
        migrations: env.app.dirs.migrations,
        synchronize: env.db.synchronize,
        useNewUrlParser: true,
    });

    // const connection = await createConnection({
    //     type: 'mongodb',
    //     url: 'mongodb+srv://krishna:krishna@cluster0.zmzdg.mongodb.net/natours',
    //     entities: env.app.dirs.entities,
    //     migrations: env.app.dirs.migrations,
    //     synchronize: env.db.synchronize,
    //     useNewUrlParser: true,
    // });

    const connection = await createConnection(connectionOptions);

    if (settings) {
        settings.setData('connection', connection);
        settings.onShutdown(() => connection.close());
    }
};
