import { makeAutoObservable } from 'mobx'

import { validateAddressLine, validateCity, validateZip } from '@hugo/validations'
import type { AppContextType } from '@/contexts/AppContext'
import type { NewAddress } from '@hugo/types'
import type { Option } from '@/components/select/View'

type State = NewAddress & {
  address1Error: string
  address2Error: string
  cityError: string
  stateError: string
  stateOptions: Option[]
  zipError: string
}

export class ViewModel {
  private _context: AppContextType = {} as AppContextType
  private _state: State = {
    address1: '',
    address1Error: '',
    address2: '',
    address2Error: '',
    city: '',
    cityError: '',
    state: '',
    stateError: '',
    stateOptions: [
      { name: 'Alabama', value: 'AL' },
      { name: 'Alaska', value: 'AK' },
      { name: 'Arizona', value: 'AZ' },
      { name: 'Arkansas', value: 'AR' },
      { name: 'California', value: 'CA' },
      { name: 'Colorado', value: 'CO' },
      { name: 'Connecticut', value: 'CT' },
      { name: 'Deleware', value: 'DE' },
      { name: 'District of Columbia', value: 'DC' },
      { name: 'Florida', value: 'FL' },
      { name: 'Georgia', value: 'GA' },
      { name: 'Hawaii', value: 'HI' },
      { name: 'Idaho', value: 'ID' },
      { name: 'Illinois', value: 'IL' },
      { name: 'Indiana', value: 'IN' },
      { name: 'Iowa', value: 'IA' },
      { name: 'Kansas', value: 'KS' },
      { name: 'Kentucky', value: 'KY' },
      { name: 'Louisiana', value: 'LA' },
      { name: 'Maine', value: 'ME' },
      { name: 'Maryland', value: 'MD' },
      { name: 'Massachusetts', value: 'MA' },
      { name: 'Michigan', value: 'MI' },
      { name: 'Minnesota', value: 'MN' },
      { name: 'Mississippi', value: 'MS' },
      { name: 'Missouri', value: 'MO' },
      { name: 'Montana', value: 'MT' },
      { name: 'Nebraska', value: 'NE' },
      { name: 'Nevada', value: 'NV' },
      { name: 'New Hampshire', value: 'NH' },
      { name: 'New Jersey', value: 'NJ' },
      { name: 'New Mexico', value: 'NM' },
      { name: 'New York', value: 'NY' },
      { name: 'North Carolina', value: 'NC' },
      { name: 'North Dakota', value: 'ND' },
      { name: 'Ohio', value: 'OH' },
      { name: 'Oklahoma', value: 'OK' },
      { name: 'Oregon', value: 'OR' },
      { name: 'Pennsylvania', value: 'PA' },
      { name: 'Rhode Island', value: 'RI' },
      { name: 'South Carolina', value: 'SC' },
      { name: 'South Dakota', value: 'SD' },
      { name: 'Tennessee', value: 'TN' },
      { name: 'Texas', value: 'TX' },
      { name: 'Utah', value: 'UT' },
      { name: 'Vermont', value: 'VT' },
      { name: 'Virginia', value: 'VA' },
      { name: 'Washington', value: 'WA' },
      { name: 'West Virginia', value: 'WV' },
      { name: 'Wisconsin', value: 'WI' },
      { name: 'Wyoming', value: 'WY' },
    ],
    zip: '',
    zipError: '',
  }

  constructor(context: AppContextType) {
    this._context = context

    if (context.quote.address) {
      this.state.address1 = context.quote.address.address1
      this.state.address2 = context.quote.address.address2
      this.state.city = context.quote.address.city
      this.state.state = context.quote.address.state
      for (const option of this.state.stateOptions) {
        option.selected = option.value === this.state.state
      }
      this.state.zip = context.quote.address.zip
    }

    makeAutoObservable(this)
  }

  get context(): AppContextType {
    return this._context
  }

  get state(): State {
    return this._state
  }

  onChangeAddress1 = (value: string): void => {
    this.state.address1 = value
    this.state.address1Error = ''
  }

  onChangeAddress2 = (value: string): void => {
    this.state.address2 = value
    this.state.address2Error = ''
  }

  onChangeCity = (value: string): void => {
    this.state.city = value
    this.state.cityError = ''
  }

  onChangeState = ({ value }: Option): void => {
    for (const option of this.state.stateOptions) {
      option.selected = option.value === value
    }
    this.state.state = value as string
    this.state.stateError = ''
  }

  onChangeZip = (value: string): void => {
    this.state.zip = value
    this.state.zipError = ''
  }

  onClickBack = (): void => {
    this.context.back()
  }

  onClickNext = async (): Promise<void> => {
    let error = false

    try {
      validateAddressLine(this.state.address1)
    } catch (err) {
      this.state.address1Error = err.message
      error = true
    }

    try {
      validateCity(this.state.city)
    } catch (err) {
      this.state.cityError = err.message
      error = true
    }

    const state = this.state.stateOptions.find((option) => option.selected)
    if (!state) {
      this.state.stateError = 'Please select a state'
      error = true
    }

    try {
      validateZip(this.state.zip)
    } catch (err) {
      this.state.zipError = err.message
      error = true
    }

    if (error) {
      return
    }

    const address: NewAddress = {
      address1: this.state.address1,
      address2: this.state.address2,
      city: this.state.city,
      state: this.state.state,
      zip: this.state.zip,
    }

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/quotes/${this.context.quote.id}`, {
      body: JSON.stringify({
        ...(this.context.quote.vehicles ? { vehicles: this.context.quote.vehicles } : {}),
        address,
        drivers: this.context.quote.drivers,
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
