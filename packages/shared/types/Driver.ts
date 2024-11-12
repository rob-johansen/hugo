import { Relationship } from './Relationship'

export type Driver = {
  birthDate: string
  firstName: string
  id: string
  lastName: string
  quoteId: string
  relationship: Relationship
}

export type NewDriver = Omit<Driver, 'id' | 'quoteId'>
