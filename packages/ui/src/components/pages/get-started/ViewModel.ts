import { makeAutoObservable } from 'mobx'

import type { AppContextType } from '@/contexts/AppContext'

type State = {
  quoteId: string
}

export class ViewModel {
  private _context: AppContextType = {} as AppContextType
  private _state: State = {
    quoteId: '',
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

  onClickGetStarted = (): void => {
    this.context.next()
  }

  onClickResumeQuote = async (): Promise<void> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/quotes/${this.state.quoteId}`, {
      headers: { 'Content-Type': 'application/json' },
    })

    if (response.ok) {
      this.context.quote = await response.json()
      this.context.next()
    } else {
      // TODO: Show a toast or banner
    }
  }

  setQuoteId = (quoteId: string): void => {
    this.state.quoteId = quoteId
  }
}
