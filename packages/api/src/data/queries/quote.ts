import { PoolClient, QueryResult } from 'pg'

import { query } from '@/data/db'
import { updateAddress } from '@/data/queries/address'
import { updateDrivers } from '@/data/queries/driver'
import { updateVehicles } from '@/data/queries/vehicle'
import type { Driver, NewDriver, NewQuote, Quote } from '@hugo/types'

export const startQuote = async (drivers: NewDriver[]): Promise<NewQuote> => {
  let count = 1

  const sql = `
    WITH quote AS (
      INSERT INTO quotes (id)
      VALUES (DEFAULT)
      RETURNING id
    ),
    driver_list AS (
      INSERT INTO drivers (quote_id, first_name, last_name, birth_date, relationship)
      VALUES ${drivers.map(() => {
        return `((SELECT id FROM quote), $${count++}, $${count++}, $${count++}, $${count++})`
      })}
      RETURNING *
    )
    SELECT *
    FROM driver_list
  `

  const values = []

  for (const driver of drivers) {
    values.push(driver.firstName)
    values.push(driver.lastName)
    values.push(driver.birthDate)
    values.push(driver.relationship)
  }

  const result: QueryResult<Driver> = await query(sql, values)

  return {
    drivers: result.rows.map((driver) => driver),
    id: result.rows[0].quoteId
  }
}

export const updateQuote = async (
  quoteId: string,
  { address, drivers, vehicles }: Partial<Quote>,
  client: PoolClient
): Promise<Partial<Quote>> => {
  // Delete the quote to take advantage of the cascade.
  await client.query(
    `DELETE FROM quotes WHERE id = $1`,
    [quoteId]
  )

  await client.query(
    `INSERT INTO quotes (id) VALUES ($1)`,
    [quoteId]
  )

  return  {
    ...(address ? { address: await updateAddress(address, quoteId, client) } : {}),
    ...(drivers ? { drivers: await updateDrivers(drivers, quoteId, client) } : {}),
    ...(vehicles ? { vehicles: await updateVehicles(vehicles, quoteId, client) } : {}),
    id: quoteId
  }
}
