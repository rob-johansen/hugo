export type Vehicle = {
  id: string
  make: string
  model: string
  quoteId: string
  vin: string
  year: string
}

export type NewVehicle = Omit<Vehicle, 'id' | 'quoteId'>
