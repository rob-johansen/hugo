import { PoolClient, QueryResult } from 'pg'

import { query } from '@/data/db'
import { updateAddress } from '@/data/queries/address'
import { updateDrivers } from '@/data/queries/driver'
import { updateVehicles } from '@/data/queries/vehicle'
import type { Address, Driver, NewDriver, NewQuote, Quote, Vehicle } from '@hugo/types'

type SelectedQuote =
  Partial<Address> &
  Partial<Driver> &
  Partial<Vehicle> &
  { addressId?: string, driverId?: string, vehicleId?: string }

export const getQuote = async (id: string, client?: PoolClient): Promise<Partial<Quote> | undefined> => {
  const sql = `
    SELECT
      a.id AS address_id, a.address1, a.address2, a.city, a.state, a.zip,
      d.id AS driver_id, d.first_name, d.last_name, d.birth_date, d.relationship,
      v.id AS vehicle_id, v.vin, v.year, v.make, v.model
    FROM quotes AS q
    LEFT JOIN addresses AS a ON a.quote_id = q.id
    LEFT JOIN drivers AS d ON d.quote_id = q.id
    LEFT JOIN vehicles AS v ON v.quote_id = q.id
    WHERE q.id = $1
  `

  const values = [id]

  const result: QueryResult<SelectedQuote> = client
    ? await client.query(sql, values)
    : await query(sql, values)

  if (result.rows.length === 0) {
    return
  }

  let address: Partial<Address> | undefined
  const driverMap: Map<string, Partial<Driver>> = new Map()
  const vehicleMap: Map<string, Partial<Vehicle>> = new Map()

  for (const row of result.rows) {
    if (row.addressId && !address) {
      address = {
        address1: row.address1,
        address2: row.address2,
        city: row.city,
        id: row.addressId,
        quoteId: id,
        state: row.state,
        zip: row.zip
      }
    }

    if (row.driverId && !driverMap.has(row.driverId)) {
      driverMap.set(row.driverId, {
        birthDate: row.birthDate,
        firstName: row.firstName,
        lastName: row.lastName,
        id: row.driverId,
        quoteId: id,
        relationship: row.relationship
      })
    }

    if (row.vehicleId && !vehicleMap.has(row.vehicleId)) {
      vehicleMap.set(row.vehicleId, {
        id: row.vehicleId,
        make: row.make,
        model: row.model,
        quoteId: id,
        vin: row.vin,
        year: row.year
      })
    }
  }

  return {
    ...(address ? { address } : {}),
    ...(driverMap.size > 0 ? { drivers: Array.from(driverMap.values()) } : {}),
    ...(vehicleMap.size > 0 ? { vehicles: Array.from(vehicleMap.values()) } : {}),
    id
  } as Partial<Quote>
}

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

export const updatePrice = async (
  price: number,
  quoteId: string,
  client: PoolClient
): Promise<boolean> => {
  const sql = `
    UPDATE quotes
    SET price = $1
    WHERE id = $2
  `
  const result = await client.query(sql, [price, quoteId])
  return result.command === 'UPDATE' && result.rowCount === 1
}

export const updateQuote = async (
  quoteId: string,
  { address, drivers, vehicles }: Partial<Quote>,
  client: PoolClient
): Promise<Partial<Quote>> => {
  // Delete the quote to take advantage of the cascade.
  await client.query(
    'DELETE FROM quotes WHERE id = $1',
    [quoteId]
  )

  await client.query(
    'INSERT INTO quotes (id) VALUES ($1)',
    [quoteId]
  )

  return  {
    ...(address ? { address: await updateAddress(address, quoteId, client) } : {}),
    ...(drivers ? { drivers: await updateDrivers(drivers, quoteId, client) } : {}),
    ...(vehicles ? { vehicles: await updateVehicles(vehicles, quoteId, client) } : {}),
    id: quoteId
  }
}
