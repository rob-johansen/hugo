import { PoolClient } from 'pg'

export const run = async (client: PoolClient): Promise<void> => {
  await client.query(`
    CREATE TABLE IF NOT EXISTS quotes (
      id           uuid   NOT NULL  DEFAULT gen_random_uuid(),
      price        integer,
      PRIMARY KEY  (id)
    )
  `)
}
