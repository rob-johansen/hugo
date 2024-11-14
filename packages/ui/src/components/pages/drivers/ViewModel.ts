import { makeAutoObservable } from 'mobx'

import { Relationship } from '@hugo/types'
import { validateBirthDate, validateName } from '@hugo/validations'
import type { AppContextType } from '@/contexts/AppContext'
import type { NewDriver } from '@hugo/types'
import type { Option } from '@/components/select/View'

type State = NewDriver & {
  birthDateError: string
  firstNameError: string
  lastNameError: string
  relationshipOptions: Option[]
}

export class ViewModel {
  private _context: AppContextType = {} as AppContextType
  private _state: State = {
    birthDate: '',
    birthDateError: '',
    firstName: '',
    firstNameError: '',
    lastName: '',
    lastNameError: '',
    relationship: Relationship.Primary,
    relationshipOptions: [
      { name: Relationship.Primary, value: Relationship.Primary },
      { name: Relationship.Spouse, value: Relationship.Spouse },
      { name: Relationship.Child, value: Relationship.Child },
      { name: Relationship.Parent, value: Relationship.Parent },
      { name: Relationship.Sibling, value: Relationship.Sibling },
      { name: Relationship.Friend, value: Relationship.Friend },
      { name: Relationship.Other, value: Relationship.Other },
    ]
  }

  constructor(context: AppContextType) {
    this._context = context

    if (context.quote.id) {
      this.state.firstName = context.quote.drivers[0].firstName
      this.state.lastName = context.quote.drivers[0].lastName
      this.state.birthDate = context.quote.drivers[0].birthDate
    }

    makeAutoObservable(this)
  }

  get context(): AppContextType {
    return this._context
  }

  get state(): State {
    return this._state
  }

  onChangeBirthDate = (value: string): void => {
    this.state.birthDate = value
    this.state.birthDateError = ''
  }

  onChangeFirstName = (value: string): void => {
    this.state.firstName = value
    this.state.firstNameError = ''
  }

  onChangeLastName = (value: string): void => {
    this.state.lastName = value
    this.state.lastNameError = ''
  }

  onClickNext = async (): Promise<void> => {
    let error = false

    try {
      validateName(this.state.firstName)
    } catch (err) {
      this.state.firstNameError = err.message
      error = true
    }

    try {
      validateName(this.state.lastName)
    } catch (err) {
      this.state.lastNameError = err.message
      error = true
    }

    try {
      validateBirthDate(this.state.birthDate)
    } catch (err) {
      this.state.birthDateError = err.message
      error = true
    }

    if (error) {
      return
    }

    const driver: NewDriver = {
      birthDate: this.state.birthDate,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      relationship: this.state.relationship
    }

    let url = `${process.env.NEXT_PUBLIC_API_HOST}/api/v1/quotes`
    let method = 'POST'

    if (this.context.quote.id) {
      // The quote has an id, which means the user is
      // resuming a quote, so we PUT instead of POST.
      url += `/${this.context.quote.id}`
      method = 'PUT'
    }

    const response = await fetch(url, {
      body: JSON.stringify({
        ...(this.context.quote.address ? { address: this.context.quote.address } : {}),
        ...(this.context.quote.vehicles ? { vehicles: this.context.quote.vehicles } : {}),
        drivers: [driver]
      }),
      headers: { 'Content-Type': 'application/json' },
      method,
    })

    if (response.ok) {
      this.context.quote = await response.json()
      localStorage.setItem('quoteId', this.context.quote.id)
      this.context.next()
    } else {
      // TODO: Show a toast or banner
    }
  }

  onClickRelationship = ({ value }: Option): void => {
    for (const option of this.state.relationshipOptions) {
      option.selected = option.value === value
    }
  }
}
