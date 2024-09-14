import { CLICKHOUSE_DATABASE, CLICKHOUSE_HOST, CLICKHOUSE_PASSWORD } from '@backend/config';
import { createClient } from '@clickhouse/client';

export const clickhouse = createClient({
  url: CLICKHOUSE_HOST,
  password: CLICKHOUSE_PASSWORD,
  database: CLICKHOUSE_DATABASE,
});
