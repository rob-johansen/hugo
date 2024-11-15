import { makeAutoObservable } from 'mobx'

import type { AppContextType } from '@/contexts/AppContext'

export class ViewModel {
  private _state: AppContextType = {
    back: (): void => {
      this.state.step--
    },
    next: (): void => {
      this.state.step++
    },
    quote: {
      address: {
        address1: '',
        address2: '',
        city: '',
        id: '',
        quoteId: '',
        state: '',
        zip: '',
      },
      drivers: [],
      id: '',
      price: 0,
      vehicles: []
    },
    step: 1
  }

  constructor() {
    makeAutoObservable(this)
  }

  get state(): AppContextType {
    return this._state
  }

  showGetStarted = (): boolean => {
    return this.state.step === 1
  }

  showDrivers = (): boolean => {
    return this.state.step === 2
  }

  showAddress = (): boolean => {
    return this.state.step === 3
  }

  showVehicles = (): boolean => {
    return this.state.step === 4
  }

  showFinalize = (): boolean => {
    return this.state.step === 5
  }
}
