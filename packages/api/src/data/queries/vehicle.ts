import { PoolClient, QueryResult } from 'pg'

import type { Vehicle } from '@hugo/types'

export const updateVehicles = async (vehicles: Partial<Vehicle>[], quoteId: string, client: PoolClient): Promise<Vehicle[]> => {
  let count = 1

  const sql = `
    INSERT INTO vehicles (id, quote_id, vin, year, make, model)
    VALUES ${vehicles.map((vehicle) => {
      return `(${vehicle.id ? `$${count++}` : 'DEFAULT'}, $${count++}, $${count++}, $${count++}, $${count++}, $${count++})`
    })}
    RETURNING *
  `

  const values = []

  for (const vehicle of vehicles) {
    if (vehicle.id) {
      values.push(vehicle.id)
    }
    values.push(quoteId)
    values.push(vehicle.vin)
    values.push(vehicle.year)
    values.push(vehicle.make)
    values.push(vehicle.model)
  }

  const result: QueryResult<Vehicle> = await client.query(sql, values)
  return result.rows
}
