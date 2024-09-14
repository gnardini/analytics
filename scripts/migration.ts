import knex from 'knex';
import { UAParser } from 'ua-parser-js';
import { uuidv7 } from 'uuidv7';
import { clickhouse } from '@backend/db/clickhouse.js';
import { mapLocationToCountry } from '@backend/utils/countries.js';
import { DB_HOST, DB_PASSWORD, DB_USERNAME } from '@backend/config.js';

function transformData(row: any) {
  const { user_id, page, data, created_at } = row;

  const parser = new UAParser(data.userAgent);
  const browser = parser.getBrowser().name ?? '';
  const device = parser.getDevice().type ?? 'desktop';

  return {
    user_id,
    organization_id: '',
    session_id: uuidv7(),
    created_at: Math.floor(new Date(created_at).getTime() / 1000),
    event: 'pageview',
    data: page,
    extra_data: null,
    device,
    browser,
    language: data.language || null,
    location: data.location || null,
    country: mapLocationToCountry(data.location),
    referrer: data.referrer || null,
  };
}

async function migrateData() {
  return;
  const db = knex({
    client: 'pg',
    connection: {
      host: DB_HOST,
      database: 'analytics_aramzone',
      user: DB_USERNAME,
      password: DB_PASSWORD,
    },
    pool: {
      min: 0,
      max: 20,
    },
  });

  const batchSize = 1000;
  let offset = 0;

  while (true) {
    const rows = await db.raw(`
      SELECT user_id, page, data, created_at
      FROM pageview
      ORDER BY created_at
      LIMIT ${batchSize}
      OFFSET ${offset}
    `);

    if (rows.rows.length === 0) {
      break;
    }

    const transformedData = rows.rows.map(transformData);
    await clickhouse.insert({
      table: 'event',
      values: [transformedData],
      format: 'JSONEachRow',
    });

    console.log(`Migrated ${offset + rows.rows.length} rows`);
    offset += rows.rows.length;
  }

  console.log('Migration completed');
  process.exit(0);
}

migrateData().catch((error) => {
  console.error('Migration failed:', error);
  process.exit(1);
});
