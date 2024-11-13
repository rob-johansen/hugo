import React, { useRef } from 'react'

import type { Props } from './View'
import View from './View'
import ViewModel from './ViewModel'

export const Select = (props: Props): React.JSX.Element => {
  const vm = useRef(new ViewModel())
  return <View {...props} vm={vm.current} />
}
