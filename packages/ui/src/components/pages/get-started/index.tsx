import { observer } from 'mobx-react-lite'
import { useContext } from 'react'
import type React from 'react'

import { AppContext } from '@/contexts/AppContext'
import { Button } from '@/components/button/Button'
import { Icon, ArrowForward } from '@/components/icon'
import { ViewModel } from './ViewModel'

type ViewProps = {
  vm: ViewModel
}

export const GetStarted = (): React.JSX.Element => {
  const context = useContext(AppContext)
  const vm = new ViewModel(context)
  return <View vm={vm} />
}

const View = observer(({ vm }: ViewProps): React.JSX.Element => {
  return (
    <div className="flex flex-col font-bold items-center leading-tight text-[3rem]">
      <span>The future of</span>
      <span className="text-purple">car insurance</span>
      <Button
        className="mt-[40px]"
        icon={{
          element: <Icon source={ArrowForward} />,
          location: 'right'
        }}
        onClick={vm.onClickGetStarted}
      >
        Get started
      </Button>
    </div>
  )
})
