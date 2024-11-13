import { makeAutoObservable } from 'mobx'

import { Relationship } from '@hugo/types'
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
      { name: Relationship.Primary, selected: true, value: Relationship.Primary },
      { name: Relationship.Spouse, selected: false, value: Relationship.Spouse },
      { name: Relationship.Child, selected: false, value: Relationship.Child },
      { name: Relationship.Parent, selected: false, value: Relationship.Parent },
      { name: Relationship.Sibling, selected: false, value: Relationship.Sibling },
      { name: Relationship.Friend, selected: false, value: Relationship.Friend },
      { name: Relationship.Other, selected: false, value: Relationship.Other },
    ]
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

  onClickRelationship = ({ value }: Option): void => {
    for (const option of this.state.relationshipOptions) {
      option.selected = option.value === value
    }
  }
}
