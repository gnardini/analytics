import dotenv from 'dotenv';

dotenv.config();

export const PUBLIC_APP_URL = 'https://phinxer.com';

export const PORT = process.env.PORT || 8080;
export const ENVIRONMENT = process.env.ENVIRONMENT ?? 'undefined';
export const IS_DEV_MODE = ENVIRONMENT === 'development';
export const JWT_SECRET = process.env.JWT_SECRET!;

export const DB_HOST = process.env.DB_HOST ?? 'localhost';
export const DB_NAME = process.env.DB_NAME ?? 'pathways_test';
export const DB_USERNAME = process.env.DB_USERNAME ?? 'postgres';
export const DB_PASSWORD = process.env.DB_PASSWORD ?? 'postgres';
export const DB_RUN_MIGRATIONS = process.env.DB_RUN_MIGRATIONS === 'true';

export const CLICKHOUSE_HOST = process.env.CLICKHOUSE_HOST ?? '';
export const CLICKHOUSE_PASSWORD = process.env.CLICKHOUSE_PASSWORD ?? '';
export const CLICKHOUSE_DATABASE = process.env.CLICKHOUSE_DATABASE ?? '';

export const RESEND_API_KEY = process.env.RESEND_API_KEY ?? '';

export const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY ?? '';
export const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET ?? '';
export const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY ?? '';
