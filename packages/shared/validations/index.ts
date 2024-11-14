import { ClientError, Relationship, RelationshipValues } from '@hugo/types'
import type { NewAddress, NewDriver, NewVehicle } from '@hugo/types'

export const UUID_LENGTH = 36

export const validateAddress = (address?: NewAddress): NewAddress => {
  if (!address) {
    throw new ClientError('Please enter an address')
  }

  validateAddressLine(address.address1)
  validateCity(address.city)
  // TODO: Move state values to shared types and validate here
  validateZip(address.zip)

  return address
}

export const validateAddressLine = (line?: string): string => {
  if (!line) {
    throw new ClientError('Please enter an address')
  }

  return line
}

export const validateBirthDate = (birthDate?: string): string => {
  if (!birthDate) {
    throw new ClientError('Please enter a birth date')
  }

  // TODO: Add more robust validation here (only 12 months, correct name of days per month, etc.)
  const [month, date, year] = birthDate.split('/')
  const numericYear = Number.parseInt(year)

  if (!/^\d{2}$/.test(month) || !/^\d{2}$/.test(date) || Number.isNaN(numericYear) || !/^\d{4}$/.test(year)) {
    throw new ClientError('Please use MM/DD/YYYY format')
  }

  const sixteenYearsAgo = new Date().getFullYear() - 16

  if (sixteenYearsAgo < numericYear) {
    throw new ClientError('Drivers must be at least 16 years old')
  }

  return birthDate
}

export const validateCity = (city?: string): string => {
  if (!city) {
    throw new ClientError('Please enter a city')
  }

  return city
}

export const validateDrivers = (drivers?: NewDriver[]): NewDriver[] => {
  if (!drivers || drivers.length === 0) {
    throw new ClientError('Please provide one or more drivers')
  }

  for (const driver of drivers) {
    validateBirthDate(driver.birthDate)
    validateName(driver.firstName)
    validateName(driver.lastName)
    validateRelationship(driver.relationship)
  }

  return drivers
}

export const validateVehicles = (vehicles?: NewVehicle[]): NewVehicle[] => {
  if (!vehicles || vehicles.length === 0) {
    throw new ClientError('Please provide one or more drivers')
  }

  for (const vehicle of vehicles) {
    validateMake(vehicle.make)
    validateModel(vehicle.model)
    validateVin(vehicle.vin)
    validateVehicleYear(vehicle.year)
  }

  return vehicles
}

export const validateId = (id?: string): string => {
  if (!id || id.length !== UUID_LENGTH || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    throw new ClientError('Invalid ID')
  }

  return id
}

export const validateMake = (make?: string): string => {
  if (!make) {
    throw new ClientError('Please enter a make')
  }

  return make
}

export const validateModel = (model?: string): string => {
  if (!model) {
    throw new ClientError('Please enter a model')
  }

  return model
}

export const validateName = (name?: string): string => {
  if (!name) {
    throw new ClientError('Please enter a name')
  }

  return name
}

export const validateRelationship = (relationship?: Relationship): Relationship => {
  if (!relationship) {
    throw new ClientError('Please choose a relationship')
  }

  if (!RelationshipValues.includes(relationship)) {
    throw new ClientError(`Unsupported relationship: ${relationship}`)
  }

  return relationship
}

export const validateVehicleYear = (year?: string): string => {
  const numericYear = Number.parseInt(year ?? '')

  if (!year || year.length !== 4 || Number.isNaN(numericYear) || !/^\d{4}$/.test(year)) {
    throw new ClientError('Please enter a 4-digit year')
  }

  const nextYear = new Date().getFullYear() + 1

  if (numericYear < 1985) {
    throw new ClientError('Unfortunately our limit is 1985')
  }

  if (numericYear > nextYear) {
    throw new ClientError(`Unfortunately our limt is ${nextYear}`)
  }

  return year
}

export const validateVin = (vin?: string): string => {
  if (!vin) {
    throw new ClientError('Please enter a VIN')
  }

  return vin
}

export const validateZip = (zip?: string): string => {
  if (!zip || zip.length !== 5 || !/^\d{5}$/.test(zip)) {
    throw new ClientError('Please enter a 5-digit zip code')
  }

  return zip
}
