import type { Address } from './Address'
import type { Driver } from './Driver'
import type { Vehicle } from './Vehicle'

export type Quote = {
  address: Address
  drivers: Driver[]
  id: string
  price: number
  vehicles: Vehicle[]
}

export type NewQuote = Omit<Quote, 'address' | 'price' | 'vehicles'>
