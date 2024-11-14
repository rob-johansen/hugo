import { twMerge } from 'tailwind-merge'
import type React from 'react'

import type { IconProps } from '@/components/icon/Icon'

export const ArrowBack = ({
  className,
  primary = '#ffffff'
}: IconProps): React.JSX.Element => {
  className = twMerge('h-[16px] w-[16px]', className)
  return (
    <svg className={className} viewBox="0 0 512 512">
      <path
        d="M244 400L100 256l144-144M120 256h292"
        fill="none"
        stroke={primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="48"
      />
    </svg>
  )
}
