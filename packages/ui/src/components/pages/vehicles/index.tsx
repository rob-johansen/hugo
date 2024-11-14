import { observer } from 'mobx-react-lite'
import { ChangeEvent, useContext } from 'react'
import type React from 'react'

import { AppContext } from '@/contexts/AppContext'
import { Button } from '@/components/button/Button'
import { Icon, ArrowBack, ArrowForward } from '@/components/icon'
import { TextField } from '@/components/text-field/TextField'
import { ViewModel } from './ViewModel'

type ViewProps = {
  vm: ViewModel
}

export const Vehicles = (): React.JSX.Element => {
  const context = useContext(AppContext)
  const vm = new ViewModel(context)
  return <View vm={vm} />
}

const View = observer(({ vm }: ViewProps): React.JSX.Element => {
  return (
    <div className="flex flex-col">
      <h1 className="font-bold mb-[40px] text-[1.5rem]">
        How about the vehicle?
      </h1>
      <TextField
        error={vm.state.makeError}
        id="make"
        label="Make"
        onChange={(event: ChangeEvent<HTMLInputElement>): void => vm.onChangeMake(event.target.value)}
        value={vm.state.make}
      />
      <TextField
        error={vm.state.modelError}
        id="model"
        label="Model"
        onChange={(event: ChangeEvent<HTMLInputElement>): void => vm.onChangeModel(event.target.value)}
        value={vm.state.model}
      />
      <TextField
        error={vm.state.yearError}
        id="year"
        label="Year"
        onChange={(event: ChangeEvent<HTMLInputElement>): void => vm.onChangeYear(event.target.value)}
        value={vm.state.year}
      />
      <TextField
        error={vm.state.vinError}
        id="vin"
        label="VIN"
        onChange={(event: ChangeEvent<HTMLInputElement>): void => vm.onChangeVin(event.target.value)}
        value={vm.state.vin}
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
