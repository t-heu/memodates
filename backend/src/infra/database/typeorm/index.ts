import {config} from 'dotenv'

config({
  path: process.env.NODE_ENV === 'test' ? '.env.test' : '.env'
})

import { createConnection, getConnectionOptions, Connection } from 'typeorm';

import {User} from '../../../domain/User'
import {Birthday} from '../../../domain/Birthday'

export default async (name = 'default'): Promise<Connection> => {
  try {
    const defaultOptions = await getConnectionOptions();
    
    return createConnection(
      Object.assign(defaultOptions, {
        entities: [User,Birthday],
        name,
        database: process.env.DB_DATABASE, //process.env.NODE_ENV === 'test' ? 'tests' : defaultOptions.database,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
      }),
    );
  } catch(error) {
    console.log(error)
    return error
  }
}
