import { makeAutoObservable } from 'mobx'

export default class ViewModel {
  private _open = false

  constructor () {
    makeAutoObservable(this)
  }

  get open(): boolean {
    return this._open
  }

  setOpen = (value: boolean): void => {
    this._open = value
  }
}
