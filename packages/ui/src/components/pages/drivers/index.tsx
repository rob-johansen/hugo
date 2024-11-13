import { observer } from 'mobx-react-lite'
import { ChangeEvent, useContext } from 'react'
import type React from 'react'

import { AppContext } from '@/contexts/AppContext'
import { Select } from '@/components/select'
import { TextField } from '@/components/text-field/TextField'
import { ViewModel } from './ViewModel'

type ViewProps = {
  vm: ViewModel
}

export const Drivers = (): React.JSX.Element => {
  const context = useContext(AppContext)
  const vm = new ViewModel(context)
  return <View vm={vm} />
}

const View = observer(({ vm }: ViewProps): React.JSX.Element => {
  return (
    <div className="flex flex-col">
      <TextField
        error={vm.state.firstNameError}
        id="first"
        label="First name"
        onChange={(event: ChangeEvent<HTMLInputElement>): void => vm.onChangeFirstName(event.target.value)}
        value={vm.state.firstName}
      />
      <TextField
        error={vm.state.lastNameError}
        id="last"
        label="Last name"
        onChange={(event: ChangeEvent<HTMLInputElement>): void => vm.onChangeLastName(event.target.value)}
        value={vm.state.lastName}
      />
      <TextField
        error={vm.state.birthDateError}
        id="last"
        label="Birth date"
        onChange={(event: ChangeEvent<HTMLInputElement>): void => vm.onChangeBirthDate(event.target.value)}
        placeholder="MM/DD/YYYY"
        value={vm.state.birthDate}
      />
      <Select
        label="Relationship"
        options={vm.state.relationshipOptions}
        onClickOption={vm.onClickRelationship}
      />
    </div>
  )
})
