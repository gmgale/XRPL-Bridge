import { Pool } from 'pg';

export default new Pool({
  max: 20,
  connectionString: process.env.PG_CONN
    ? process.env.PG_CONN
    : 'postgres://postgres:postgres@localhost:5432/docker',
  idleTimeoutMillis: 30000,
});
