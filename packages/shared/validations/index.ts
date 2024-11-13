import { ClientError, Relationship, RelationshipValues } from '@hugo/types'
import type { NewDriver } from '@hugo/types'

export const UUID_LENGTH = 36

export const validateBirthDate = (birthDate?: string): string => {
  if (!birthDate) {
    throw new ClientError('Please enter a birth date.')
  }

  // TODO: Validate the format of the date (e.g. 1976-02-11)

  return birthDate
}

export const validateDrivers = (drivers?:NewDriver[]): NewDriver[] => {
  if (!drivers || drivers.length === 0) {
    throw new ClientError('Please provide one or more drivers.')
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
    throw new ClientError('Please enter a name.')
  }

  return name
}

export const validateRelationship = (relationship?: Relationship): Relationship => {
  if (!relationship) {
    throw new ClientError('Please choose a relationship.')
  }

  if (!RelationshipValues.includes(relationship)) {
    throw new ClientError(`Unsupported relationship: ${relationship}`)
  }

  return relationship
}
