import { makeAutoObservable } from 'mobx'

import type { AppContextType } from '@/contexts/AppContext'

export class ViewModel {
  private _context: AppContextType = {} as AppContextType

  constructor(context: AppContextType) {
    this._context = context
    makeAutoObservable(this)
  }

  get context(): AppContextType {
    return this._context
  }

  onClickFinalize = async (): Promise<boolean> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_HOST}/api/v1/quotes/finalize`, {
      body: JSON.stringify({ quoteId: this.context.quote.id }),
      headers: { 'Content-Type': 'application/json' },
      method: 'POST',
    })

    return response.ok
  }
}
