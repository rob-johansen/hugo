import { twMerge } from 'tailwind-merge'
import type React from 'react'

import { Icon, Loading } from '@/components/icon'

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  icon?: {
    element: React.JSX.Element,
    location?: 'left' | 'right'
  }
  loading?: boolean
  variant?: 'primary' | 'secondary'
}

export const Button = ({
  children,
  className,
  disabled,
  icon,
  loading,
  variant = 'primary',
  ...props
}: Props): React.JSX.Element => {
  const styles = twMerge(
    `
      active:bg-purple
      bg-purple/[0.95]
      flex
      font-bold
      gap-[8px]
      h-[40px]
      hover:bg-purple/[0.85]
      items-center
      justify-center
      max-w-[260px]
      relative
      rounded-[9999px]
      text-[1rem]
      text-white
      tracking-[0.5px]
      w-full
    `,
    variant === 'secondary' &&
    `
      active:bg-[#01add8]/[0.275]
      bg-[#01add8]/[0.375]
      hover:bg-[#01add8]/[0.325]
    `,
    disabled &&
    `
      active:bg-[#444444]
      bg-[#444444]
      border-transparent
      cursor-not-allowed
      hover:bg-[#444444]
      text-[#888888]
    `,
    loading &&
    `
      active:bg-[#6ea9db]
      bg-[#6ea9db]
      cursor-default
      hover:bg-[#6ea9db]
    `,
    icon && icon.location === 'right' ? 'flex-row' : 'flex-row-reverse',
    className
  )

  const iconStyles = twMerge(
    disabled && 'grayscale invert-[50%] opacity-60',
    loading && 'opacity-0'
  )

  return (
    <button {...props} className={styles} disabled={disabled || loading}>
      <span className={loading ? 'opacity-0' : ''}>{children}</span>
      {icon && <span className={iconStyles}>{icon.element}</span>}
      {loading && <Icon className="absolute" source={Loading} />}
    </button>
  )
}
