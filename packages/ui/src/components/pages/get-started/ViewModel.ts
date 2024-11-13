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

  onClickGetStarted = (): void => {
    this.context.next()
  }
}
