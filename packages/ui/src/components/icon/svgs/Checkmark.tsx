import { twMerge } from 'tailwind-merge'
import type React from 'react'

import type { IconProps } from '@/components/icon/Icon'

export const Checkmark = ({
  className,
  primary = '#6e66db',
}: IconProps): React.JSX.Element => {
  className = twMerge('h-[20px] w-[20px]', className)
  return (
    <svg className={className} viewBox="0 0 512 512">
      <path
        fill="none"
        stroke={primary}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="32"
        d="M416 128L192 384l-96-96"
      />
    </svg>
  )
}
