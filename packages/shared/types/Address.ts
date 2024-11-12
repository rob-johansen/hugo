export type Address = {
  address1: string
  address2?: string
  city: string
  id: string
  quoteId: string
  state: string
  zip: string
}

export type NewAddress = Omit<Address, 'id' | 'quoteId'>
