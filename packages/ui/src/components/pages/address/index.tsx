import { observer } from 'mobx-react-lite'
import { ChangeEvent, useContext } from 'react'
import type React from 'react'

import { AppContext } from '@/contexts/AppContext'
import { Button } from '@/components/button/Button'
import { Icon, ArrowBack, ArrowForward } from '@/components/icon'
import { Select } from '@/components/select'
import { TextField } from '@/components/text-field/TextField'
import { ViewModel } from './ViewModel'

type ViewProps = {
  vm: ViewModel
}

export const Address = (): React.JSX.Element => {
  const context = useContext(AppContext)
  const vm = new ViewModel(context)
  return <View vm={vm} />
}

const View = observer(({ vm }: ViewProps): React.JSX.Element => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold mb-[40px] text-[1.5rem]">
        What is the driver’s address?
      </h1>
      <TextField
        error={vm.state.address1Error}
        id="address1"
        label="Address line 1"
        onChange={(event: ChangeEvent<HTMLInputElement>): void => vm.onChangeAddress1(event.target.value)}
        value={vm.state.address1}
      />
      <TextField
        error={vm.state.address2Error}
        id="address2"
        label="Address line 2 (optional)"
        onChange={(event: ChangeEvent<HTMLInputElement>): void => vm.onChangeAddress2(event.target.value)}
        value={vm.state.address2 ?? ''}
      />
      <TextField
        error={vm.state.cityError}
        id="city"
        label="City"
        onChange={(event: ChangeEvent<HTMLInputElement>): void => vm.onChangeCity(event.target.value)}
        value={vm.state.city}
      />
      <Select
        error={vm.state.stateError}
        id="state"
        label="State"
        options={vm.state.stateOptions}
        onClickOption={vm.onChangeState}
        placeholder="Select a state"
      />
      <TextField
        error={vm.state.zipError}
        id="zip"
        label="Zip Code"
        onChange={(event: ChangeEvent<HTMLInputElement>): void => vm.onChangeZip(event.target.value)}
        value={vm.state.zip}
      />
      <div className="flex justify-between mt-[20px] w-full">
        <Button
          className="w-[120px]"
          icon={{
            element: <Icon source={ArrowBack}/>
          }}
          onClick={vm.onClickBack}
        >
          Back
        </Button>
        <Button
          className="w-[120px]"
          icon={{
            element: <Icon source={ArrowForward}/>,
            location: 'right'
          }}
          onClick={vm.onClickNext}
        >
          Next
        </Button>
      </div>
    </div>
  )
})
