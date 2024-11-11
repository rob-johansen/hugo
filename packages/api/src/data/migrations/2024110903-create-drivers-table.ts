import { PoolClient } from 'pg'

export const run = async (client: PoolClient): Promise<void> => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS drivers (
      id            uuid   NOT NULL  DEFAULT gen_random_uuid(),
      quote_id      uuid   NOT NULL  REFERENCES quotes (id) ON DELETE CASCADE,
      first_name    text   NOT NULL,
      last_name     text   NOT NULL,
      birth_date    text   NOT NULL,
      relationship  text   NOT NULL,
      PRIMARY KEY   (id)
    )
  `)

  await client.query('CREATE INDEX ON drivers (quote_id)')
}
