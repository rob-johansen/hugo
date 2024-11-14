'use client'

import { observer } from 'mobx-react-lite'
import type React from 'react'

import { Address } from '@/components/pages/address'
import { AppContext } from '@/contexts/AppContext'
import { Drivers } from '@/components/pages/drivers'
import { Finalize } from '@/components/pages/finalize'
import { GetStarted } from '@/components/pages/get-started'
import { Vehicles } from '@/components/pages/vehicles'
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
      {vm.showDrivers() && <Drivers />}
      {vm.showAddress() && <Address />}
      {vm.showVehicles() && <Vehicles />}
      {vm.showFinalize() && <Finalize />}
    </AppContext.Provider>
  )
})
