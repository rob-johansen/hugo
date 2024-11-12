import { PoolClient, QueryResult } from 'pg'

import type { Driver } from '@hugo/types'

export const updateDrivers = async (drivers: Partial<Driver>[], quoteId: string, client: PoolClient): Promise<Driver[]> => {
  let count = 1

  const sql = `
    INSERT INTO drivers (id, quote_id, first_name, last_name, birth_date, relationship)
    VALUES ${drivers.map((driver) => {
      return `(${driver.id ? `$${count++}` : 'DEFAULT'}, $${count++}, $${count++}, $${count++}, $${count++}, $${count++})`
    })}
    RETURNING *
  `

  const values = []

  for (const driver of drivers) {
    if (driver.id) {
      values.push(driver.id)
    }
    values.push(quoteId)
    values.push(driver.firstName)
    values.push(driver.lastName)
    values.push(driver.birthDate)
    values.push(driver.relationship)
  }

  const result: QueryResult<Driver> = await client.query(sql, values)
  return result.rows
}
