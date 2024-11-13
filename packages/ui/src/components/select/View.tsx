import {
  autoUpdate,
  flip,
  FloatingFocusManager,
  offset,
  useClick,
  useDismiss,
  useFloating,
  useInteractions
} from '@floating-ui/react'
import { observer } from 'mobx-react-lite'
import { twMerge } from 'tailwind-merge'
import type React from 'react'

import { Icon, CaretDown, Checkmark } from '@/components/icon'
import { TextField } from '@/components/text-field/TextField'
import type { Props as TextFieldProps } from '@/components/text-field/TextField'
import type ViewModel from './ViewModel'

export type Option = {
  name: string
  selected?: boolean
  value: string | number
}

export type Props = TextFieldProps & {
  containerClassName?: string
  onClickOption: (option: Option) => void
  options: Option[]
}

const View = ({
  className,
  containerClassName,
  onClickOption,
  options,
  vm,
  ...props
}: Props & { vm: ViewModel }): React.JSX.Element => {
  const { context, floatingStyles, refs } = useFloating({
    middleware: [offset(8), flip()],
    onOpenChange: vm.setOpen,
    open: vm.open,
    placement: 'bottom-start',
    whileElementsMounted: autoUpdate
  })

  const { getFloatingProps, getReferenceProps } = useInteractions([
    useClick(context),
    useDismiss(context, { ancestorScroll: true })
  ])

  const containerStyles = twMerge(
    `
      flex flex-col relative
    `,
    containerClassName
  )

  const textFieldStyles = twMerge(
    `
      cursor-pointer
      pr-[32px]
      selection:bg-purple
      selection:text-white
      text-[1rem]
    `,
    className
  )

  const iconStyles = twMerge(
    `
      absolute
      cursor-pointer
      h-[14px]
      pointer-events-none
      right-[8px]
      transition
      w-[14px]
    `,
    props.disabled && 'cursor-not-allowed',
    props.label && vm.open && 'top-[37px]',
    props.label && !vm.open && 'top-[38px]',
    !props.label && vm.open && 'top-[13px]',
    !props.label && !vm.open && 'top-[14px]',
    vm.open && 'rotate-180'
  )

  return (
    <div className={containerStyles}>
      <TextField
        {...getReferenceProps()}
        {...props}
        className={textFieldStyles}
        readOnly
        ref={refs.setReference}
        value={options
          .filter((option: Option): boolean | undefined => option.selected)
          .map((option: Option): string => option.name)
          .join(', ')
        }
      />
      <Icon className={iconStyles} source={CaretDown} />
      {vm.open && (
        <FloatingFocusManager context={context} modal={false}>
          <div
            {...getFloatingProps()}
            className="bg-white border-[1px] border-[#a2aaad] m-0 max-h-[260px] overflow-y-auto rounded shadow-sm z-50"
            ref={refs.setFloating}
            style={{
              ...floatingStyles,
              minWidth: refs.reference.current?.getBoundingClientRect().width
            }}
          >
            <div className="flex flex-col rounded">
              {options.map((option: Option): React.JSX.Element => {
                const { name, selected, value } = option
                const optionStyles = twMerge(
                  `
                    cursor-pointer flex hover:bg-purple/[0.15] items-center justify-between text-left transition
                  `,
                  selected && 'bg-purple/[0.1] pr-[8px]'
                )
                const nameStyles = twMerge(
                  `
                    hover:text-purple px-[1rem] py-[0.375rem] w-full whitespace-nowrap transition
                  `,
                  selected && 'text-purple pr-0'
                )
                return (
                  <button
                    className={optionStyles}
                    key={value}
                    onClick={(): void => {
                      vm.setOpen(false)
                      onClickOption(option)
                    }}
                    tabIndex={0}
                  >
                    <span className={nameStyles}>{name}</span>
                    {selected && (
                      <Icon
                        className="h-[22px] relative top-[-1px] w-[22px]"
                        source={Checkmark}
                      />
                    )}
                  </button>
                )
              })}
            </div>
          </div>
        </FloatingFocusManager>
      )}
    </div>
  )
}

export default observer(View)
