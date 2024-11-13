import { twMerge } from 'tailwind-merge'
import type React from 'react'

import type { IconProps } from '@/components/icon/Icon'

export const Add = ({
  className,
  primary = '#ffffff'
}: IconProps): React.JSX.Element => {
  className = twMerge('h-[20px] w-[20px]', className)
  return (
    <svg className={className} viewBox="0 0 512 512">
      <path
        d="M256 112v288M400 256H112"
        fill="none"
        stroke={primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
      />
    </svg>
  )
}
