import { makeAutoObservable } from 'mobx'

import type { AppContextType } from '@/contexts/AppContext'

type State = {
  loading: boolean
}

export class ViewModel {
  private _context: AppContextType = {} as AppContextType
  private _state: State = {
    loading: false
  }

  constructor(context: AppContextType) {
    this._context = context
    makeAutoObservable(this)
  }

  get context(): AppContextType {
    return this._context
  }

  get state(): State {
    return this._state
  }

  onClickBack = (): void => {
    this.context.back()
  }

  onClickSubmit = async (): Promise<boolean> => {
    this.state.loading = true

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/quotes/finalize`, {
      body: JSON.stringify({ quoteId: this.context.quote.id }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    if (response.ok) {
      localStorage.removeItem('quoteId')
    }

    return response.ok
  }
}
