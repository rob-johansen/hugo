import type { Address } from './Address'
import type { Driver } from './Driver'
import type { Vehicle } from './Vehicle'

export type Quote = {
  address: Address
  drivers: Driver[]
  id: string
  vehicles: Vehicle[]
}

export type NewQuote = Omit<Quote, 'address' | 'vehicles'>
