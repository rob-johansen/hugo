import { QueryResult } from 'pg'

import { query } from '@/data/db'
import type { Driver, NewDriver, NewQuote } from '@hugo/types'

export const startQuote = async (drivers: NewDriver[]): Promise<NewQuote> => {
  let count = 1

  const sql = `
    WITH
    quote AS (
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

export const updateQuote = async (): Promise<void> => {

}
