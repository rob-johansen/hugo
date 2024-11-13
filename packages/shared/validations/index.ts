import { ClientError, Relationship, RelationshipValues } from '@hugo/types'
import type { NewDriver } from '@hugo/types'

export const UUID_LENGTH = 36

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

  if (!/^\d{2}$/.test(month) || !/^\d{2}$/.test(date) || !/^\d{4}$/.test(year)) {
    throw new ClientError('Please use MM/DD/YYYY format')
  }

  const sixteenYearsAgo = new Date().getFullYear() - 16
  const birthYear = Number.parseInt(year)

  if (Number.isNaN(birthYear) || sixteenYearsAgo < birthYear) {
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

export const validateDrivers = (drivers?:NewDriver[]): NewDriver[] => {
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

export const validateId = (id?: string): string => {
  if (!id || id.length !== UUID_LENGTH || !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    throw new ClientError('Invalid ID')
  }

  return id
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

export const validateZip = (zip?: string): string => {
  if (!zip) {
    throw new ClientError('Please enter a zip code')
  }

  if (zip.length !== 5 || !/^\d{5}$/.test(zip)) {
    throw new ClientError('Please enter a 5-digit zip code')
  }

  return zip
}
