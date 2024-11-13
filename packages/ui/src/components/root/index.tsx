'use client'

import { observer } from 'mobx-react-lite'
import type React from 'react'

import { AppContext } from '@/contexts/AppContext'
import { GetStarted } from '@/components/pages/get-started'
import { ViewModel } from './ViewModel'

type ViewProps = {
  vm: ViewModel
}

export const Root = (): React.JSX.Element => {
  const vm = new ViewModel()
  return <View vm={vm} />
}

const View = observer(({ vm }: ViewProps): React.JSX.Element => {
  return (
    <AppContext.Provider value={vm.state}>
      {vm.showGetStarted() && <GetStarted />}
    </AppContext.Provider>
  )
})
