import { ChevronDown, ChevronUp } from 'lucide-react'
import type { FocusEvent, ReactNode } from 'react'
import { NumericFormat, type NumericFormatProps } from 'react-number-format'
import { Button } from '@/registry/new-york/ui/button/components/button'
import { ButtonGroup } from '@/registry/new-york/ui/button-group/components/button-group'
import { Input, type InputProps } from '@/registry/new-york/ui/input/components/input'
import { InputGroup } from '@/registry/new-york/ui/input-group/components/input-group'
import { cn } from '@/utils/ui'

// Number input
export type NumberInputProps = NumericFormatProps<InputProps> & {
  isDisplayStepper?: boolean
  prefixNode?: ReactNode
  suffixNode?: ReactNode
  // biome-ignore lint/suspicious/noExplicitAny: ignore
  onFieldChange?: (...event: any[]) => void
}

export const NumberInput = ({
  value,
  min = Number.NEGATIVE_INFINITY,
  max = Number.POSITIVE_INFINITY,
  step = 1,
  decimalScale = 3,
  allowNegative = true,
  thousandSeparator = '.',
  decimalSeparator = ',',
  valueIsNumericString = true,
  className,
  isDisplayStepper = true,
  disabled,
  prefixNode,
  suffixNode,
  onFieldChange,
  ...props
}: NumberInputProps) => {
  // Methods
  const increment = () => {
    // Using == for checking both null or undefined
    if (value == null) {
      return
    }
    onFieldChange?.(+value + +step)
  }

  const decrement = () => {
    // Using == for checking both null or undefined
    if (value == null) {
      return
    }
    onFieldChange?.(+value - +step)
  }

  const blur = (e: FocusEvent<HTMLInputElement, Element>) => {
    props.onBlur?.(e)

    // Using == for checking both null or undefined
    if (value == null) {
      return
    }
    if (value < min) {
      return onFieldChange?.(min)
    }
    if (value > max) {
      return onFieldChange?.(max)
    }
  }

  // Template
  return (
    <ButtonGroup
      className={cn(
        'w-full aria-invalid:border-destructive! aria-invalid:ring-destructive/20! dark:aria-invalid:ring-destructive/40',
        className
      )}
    >
      <InputGroup>
        <NumericFormat
          allowNegative={allowNegative}
          className={cn(isDisplayStepper && 'rounded-r-none border-0')}
          customInput={Input}
          decimalScale={decimalScale}
          decimalSeparator={decimalSeparator}
          disabled={disabled}
          max={max}
          min={min}
          step={step}
          thousandSeparator={thousandSeparator}
          value={value}
          valueIsNumericString={valueIsNumericString}
          {...props}
          onBlur={blur}
        />
      </InputGroup>

      {isDisplayStepper && (
        <>
          <Button
            aria-invalid={props['aria-invalid']}
            aria-label='Decrease value'
            disabled={disabled || (value != null && +value <= +min)}
            onClick={decrement}
            size='icon'
            variant='outline'
          >
            <ChevronDown />
          </Button>

          <Button
            aria-invalid={props['aria-invalid']}
            aria-label='Increase value'
            disabled={disabled || (value != null && +value >= +max)}
            onClick={increment}
            size='icon'
            variant='outline'
          >
            <ChevronUp />
          </Button>
        </>
      )}
    </ButtonGroup>
  )
}
