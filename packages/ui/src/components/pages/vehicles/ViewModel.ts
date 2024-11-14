import { makeAutoObservable } from 'mobx'

import { validateMake, validateModel, validateVehicleYear, validateVin } from '@hugo/validations'
import type { AppContextType } from '@/contexts/AppContext'
import type { NewVehicle } from '@hugo/types'

type State = NewVehicle & {
  makeError: string
  modelError: string
  vinError: string
  yearError: string
}

export class ViewModel {
  private _context: AppContextType = {} as AppContextType
  private _state: State = {
    make: '',
    makeError: '',
    model: '',
    modelError: '',
    vin: '',
    vinError: '',
    year: '',
    yearError: ''
  }

  constructor(context: AppContextType) {
    this._context = context

    if (context.quote.vehicles) {
      this.state.make = context.quote.vehicles[0].make
      this.state.model = context.quote.vehicles[0].model
      this.state.vin = context.quote.vehicles[0].vin
      this.state.year = context.quote.vehicles[0].year
    }

    makeAutoObservable(this)
  }

  get context(): AppContextType {
    return this._context
  }

  get state(): State {
    return this._state
  }

  onChangeMake = (value: string): void => {
    this.state.make = value
    this.state.makeError = ''
  }

  onChangeModel = (value: string): void => {
    this.state.model = value
    this.state.modelError = ''
  }

  onChangeVin = (value: string): void => {
    this.state.vin = value
    this.state.vinError = ''
  }

  onChangeYear = (value: string): void => {
    this.state.year = value
    this.state.yearError = ''
  }

  onClickBack = (): void => {
    this.context.back()
  }

  onClickNext = async (): Promise<void> => {
    let error = false

    try {
      validateMake(this.state.make)
    } catch (err) {
      this.state.makeError = err.message
      error = true
    }

    try {
      validateModel(this.state.model)
    } catch (err) {
      this.state.modelError = err.message
      error = true
    }

    try {
      validateVehicleYear(this.state.year)
    } catch (err) {
      this.state.yearError = err.message
      error = true
    }

    try {
      validateVin(this.state.vin)
    } catch (err) {
      this.state.vinError = err.message
      error = true
    }

    if (error) {
      return
    }

    const vehicle: NewVehicle = {
      make: this.state.make,
      model: this.state.model,
      vin: this.state.vin,
      year: this.state.year,
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/quotes/${this.context.quote.id}`, {
      body: JSON.stringify({
        address: this.context.quote.address,
        drivers: this.context.quote.drivers,
        vehicles: [vehicle]
      }),
      headers: { 'Content-Type': 'application/json' },
      method: 'PUT',
    })

    if (response.ok) {
      this.context.quote = await response.json()
      this.context.next()
    } else {
      // TODO: Show a toast or banner
    }
  }
}
