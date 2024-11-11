import { PoolClient } from 'pg'

export const run = async (client: PoolClient): Promise<void> => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS vehicles (
      id            uuid   NOT NULL  DEFAULT gen_random_uuid(),
      quote_id      uuid   NOT NULL  REFERENCES quotes (id) ON DELETE CASCADE,
      vin           text   NOT NULL  UNIQUE,
      year          text   NOT NULL,
      make          text   NOT NULL,
      model         text   NOT NULL,
      PRIMARY KEY   (id)
    )
  `)

  await client.query('CREATE INDEX ON vehicles (quote_id)')
}
