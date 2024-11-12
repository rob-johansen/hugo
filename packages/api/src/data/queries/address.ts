import { PoolClient, QueryResult } from 'pg'

import type { Address } from '@hugo/types'

export const updateAddress = async (address: Partial<Address>, quoteId: string, client: PoolClient): Promise<Address> => {
  const { address1, address2, city, id, state, zip } = address

  let count = 1

  const sql = `
    INSERT INTO addresses (id, quote_id, address1, address2, city, state, zip)
    VALUES (${address.id ? `$${count++}` : 'DEFAULT'}, $${count++}, $${count++}, $${count++}, $${count++}, $${count++}, $${count++})
    RETURNING *
  `

  const values = []

  if (id) {
    values.push(id)
  }

  values.push(quoteId, address1, address2, city, state, zip)

  const result: QueryResult<Address> = await client.query(sql, values)
  return result.rows[0]
}
