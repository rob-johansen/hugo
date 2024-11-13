import { twMerge } from 'tailwind-merge'
import type React from 'react'

import type { IconProps } from '@/components/icon/Icon'

export const ArrowForward = ({
  className,
  primary = '#ffffff'
}: IconProps): React.JSX.Element => {
  className = twMerge('h-[16px] w-[16px]', className)
  return (
    <svg className={className} viewBox="0 0 512 512">
      <path
        d="M268 112l144 144-144 144M392 256H100"
        fill="none"
        stroke={primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
      />
    </svg>
  )
}
