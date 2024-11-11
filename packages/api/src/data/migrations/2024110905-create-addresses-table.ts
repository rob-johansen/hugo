import { PoolClient } from 'pg'

export const run = async (client: PoolClient): Promise<void> => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS addresses (
      id           uuid   NOT NULL  DEFAULT gen_random_uuid(),
      quote_id     uuid   NOT NULL  REFERENCES quotes (id) ON DELETE CASCADE,
      address1     text   NOT NULL,
      address2     text,
      city         text   NOT NULL,
      state        text   NOT NULL,
      zip          text   NOT NULL,
      PRIMARY KEY  (id)
    )
  `)

  await client.query('CREATE INDEX ON addresses (quote_id)')
}
