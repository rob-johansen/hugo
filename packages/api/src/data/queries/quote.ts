import { QueryResult } from 'pg'

import { query } from '@/data/db'
import type { Driver } from '@hugo/types'

export const startQuote = async (drivers: Omit<Driver, 'id' | 'quoteId'>[]): Promise<string> => {
  let count = 1

  const sql = `
    WITH quote AS (
      INSERT INTO quotes (id)
      VALUES (DEFAULT)
      RETURNING id
    )
    INSERT INTO drivers (quote_id, first_name, last_name, birth_date, relationship)
    VALUES ${drivers.map(() => {
      return `((SELECT id FROM quote), $${count++}, $${count++}, $${count++}, $${count++})`
    })}
    RETURNING (
      SELECT id
      FROM quote
    )
  `

  const values = []

  for (const driver of drivers) {
    values.push(driver.firstName)
    values.push(driver.lastName)
    values.push(driver.birthDate)
    values.push(driver.relationship)
  }

  const result: QueryResult<{ id: string }> = await query(sql, values)

  return result.rows[0].id
}
