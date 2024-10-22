/* eslint-disable prettier/prettier */
import Env from '../common/env';

export default {
    type: 'postgres',
    synchronize: true,
    logging: ['error'],

    host: Env.fetch('DB_HOST'),
    database: Env.fetch('DB_DATABASE'),
    username: Env.fetch('DB_USERNAME'),
    password: Env.fetch('DB_PASSWORD'),
    port: parseInt(Env.fetch('DB_PORT')),
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
};
