import { observer } from 'mobx-react-lite'
import { useRouter } from 'next/navigation'
import { useContext } from 'react'
import type React from 'react'

import { AppContext } from '@/contexts/AppContext'
import { Button } from '@/components/button/Button'
import { ViewModel } from './ViewModel'
import { ArrowForward, Icon } from '@/components/icon'

type ViewProps = {
  vm: ViewModel
}

export const Finalize = (): React.JSX.Element => {
  const context = useContext(AppContext)
  const vm = new ViewModel(context)
  return <View vm={vm} />
}

const View = observer(({ vm }: ViewProps): React.JSX.Element => {
  const router = useRouter()

  return (
    <div className="flex flex-col">
      <h1 className="font-bold mb-[40px] text-[1.5rem]">
        Review and submit:
      </h1>
      <h2 className="font-bold mb-[4px] text-[1.25rem]">
        Primary Driver
      </h2>
      <div className="flex flex-col mb-[40px]">
        <div className="flex gap-[12px]">
          <span className="font-bold min-w-[96px] text-purple">First name:</span>
          <span>{vm.context.quote.drivers[0].firstName}</span>
        </div>
        <div className="flex gap-[12px]">
          <span className="font-bold min-w-[96px] text-purple">Last name:</span>
          <span>{vm.context.quote.drivers[0].lastName}</span>
        </div>
        <div className="flex gap-[12px]">
          <span className="font-bold min-w-[96px] text-purple">Birth date:</span>
          <span>{vm.context.quote.drivers[0].birthDate}</span>
        </div>
      </div>
      <h2 className="font-bold mb-[4px] text-[1.25rem]">
        Address
      </h2>
      <div className="flex flex-col mb-[40px]">
        <div className="flex gap-[12px]">
          <span className="font-bold min-w-[120px] text-purple">Address line 1:</span>
          <span>{vm.context.quote.address.address1}</span>
        </div>
        <div className="flex gap-[12px]">
          <span className="font-bold min-w-[120px] text-purple">Address line 2:</span>
          <span>{vm.context.quote.address.address2}</span>
        </div>
        <div className="flex gap-[12px]">
          <span className="font-bold min-w-[120px] text-purple">City:</span>
          <span>{vm.context.quote.address.city}</span>
        </div>
        <div className="flex gap-[12px]">
          <span className="font-bold min-w-[120px] text-purple">State:</span>
          <span>{vm.context.quote.address.state}</span>
        </div>
        <div className="flex gap-[12px]">
          <span className="font-bold min-w-[120px] text-purple">Zip code:</span>
          <span>{vm.context.quote.address.zip}</span>
        </div>
      </div>
      <h2 className="font-bold mb-[4px] text-[1.25rem]">
        Vehicle
      </h2>
      <div className="flex flex-col mb-[40px]">
        <div className="flex gap-[12px]">
          <span className="font-bold min-w-[56px] text-purple">Make:</span>
          <span>{vm.context.quote.vehicles[0].make}</span>
        </div>
        <div className="flex gap-[12px]">
          <span className="font-bold min-w-[56px] text-purple">Model:</span>
          <span>{vm.context.quote.vehicles[0].model}</span>
        </div>
        <div className="flex gap-[12px]">
          <span className="font-bold min-w-[56px] text-purple">Year:</span>
          <span>{vm.context.quote.vehicles[0].year}</span>
        </div>
        <div className="flex gap-[12px]">
          <span className="font-bold min-w-[56px] text-purple">VIN:</span>
          <span>{vm.context.quote.vehicles[0].vin}</span>
        </div>
      </div>
      <div className="flex justify-end mt-[20px] w-full">
        <Button
          className="w-[120px]"
          icon={{
            element: <Icon source={ArrowForward}/>,
            location: 'right'
          }}
          loading={vm.state.loading}
          onClick={async (): Promise<void> => {
            const success = await vm.onClickFinalize()
            if (success) {
              router.push(`/price/${vm.context.quote.id}`)
            }
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  )
})
