import { observer } from 'mobx-react-lite'
import { useContext, useEffect } from 'react'
import type React from 'react'

import { AppContext } from '@/contexts/AppContext'
import { Button } from '@/components/button/Button'
import { Icon, ArrowForward, Logo } from '@/components/icon'
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
  useEffect(() => {
    vm.setQuoteId(localStorage.getItem('quoteId') ?? '')
  }, [])

  return (
    <div className="flex flex-col font-bold items-center leading-tight text-[3rem]">
      <Icon className="mb-[60px]" source={Logo} />
      <span>The future of</span>
      <span className="text-purple">car insurance</span>
      {vm.state.quoteId && (
        <Button
          className="mt-[40px]"
          icon={{
            element: <Icon source={ArrowForward} />,
            location: 'right'
          }}
          onClick={vm.onClickResumeQuote}
        >
          Resume quote
        </Button>
      )}
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
