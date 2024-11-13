import { twMerge } from 'tailwind-merge'
import type React from 'react'

import type { IconProps } from '@/components/icon/Icon'

export const CaretDown = ({
  className,
  primary = '#a2aaad',
}: IconProps): React.JSX.Element => {
  className = twMerge('h-[20px] w-[20px]', className)
  return (
    <svg className={className} viewBox="0 0 512 512">
      <path
        fill={primary}
        d="M98 190.06l139.78 163.12a24 24 0 0036.44 0L414 190.06c13.34-15.57 2.28-39.62-18.22-39.62h-279.6c-20.5 0-31.56 24.05-18.18 39.62z"
      />
    </svg>
  )
}
