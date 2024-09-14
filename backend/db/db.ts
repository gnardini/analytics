import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } from '@backend/config';
import knex, { Knex } from 'knex';

let knexDb: Knex;

export function db(table: string) {
  if (!knexDb) {
    initDatabase(false);
  }
  return knexDb(table);
}

export function getDatabase() {
  if (!knexDb) {
    initDatabase(false);
  }
  return knexDb;
}

export async function initDatabase(runMigrations = true): Promise<Knex> {
  if (!!knexDb) {
    return knexDb;
  }
  // @ts-ignore
  if (global.db) {
    // @ts-ignore
    knexDb = global.db;
    return knexDb;
  }
  knexDb = initDb();
  // @ts-ignore
  global.db = knexDb;

  if (runMigrations) {
    console.info('Running Migrations');

    // TODO: migrations
    // await knexDb.migrate.latest({
    //   directory: './dist/full/src/backend/db/migrations',
    //   loadExtensions: ['.js'],
    // });
  }

  console.info('Database initialized successfully');
  return knexDb;
}

function initDb() {
  return knex({
    client: 'pg',
    connection: {
      host: DB_HOST,
      database: DB_NAME,
      user: DB_USERNAME,
      password: DB_PASSWORD,
    },
    pool: {
      min: 0,
      max: 20,
    },
  });
}
