import { clickhouse } from '@backend/db/clickhouse';
import { createEventsMigration } from '@backend/db/clickhouse_migrations/001_create_events';
import { addEvnetIndexMigration } from '@backend/db/clickhouse_migrations/002_add_events_event_index';

const migrations = [createEventsMigration, addEvnetIndexMigration];

export async function runClickHouseMigrations() {
  for (const migration of migrations) {
    await clickhouse.command({
      query: migration,
    });
  }
}
