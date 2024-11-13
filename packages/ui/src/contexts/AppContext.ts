import { createContext } from 'react'

import type { Quote } from '@hugo/types'

export type AppContextType = {
  back: () => void
  next: () => void
  quote: Quote
  step: number
}

export const AppContext = createContext<AppContextType>({} as AppContextType)
