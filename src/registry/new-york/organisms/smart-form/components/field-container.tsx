import type React from 'react'
import {
  Field,
  FieldDescription,
  FieldError,
  type FieldErrorProps,
  FieldLabel,
  type FieldProps
} from '@/registry/new-york/ui/field/components/field'
import { cn } from '@/utils/ui'

export type SmartFormFieldContainerProps = FieldProps & {
  name: string
  isRequired?: boolean
  label?: React.ReactNode
  description?: React.ReactNode
  isInvalid?: boolean
  errors?: FieldErrorProps['errors']
}

export type BaseSmartFormFieldFieldProps = Omit<SmartFormFieldContainerProps, 'name' | 'isInvalid' | 'errors'> & {
  isDisabled?: boolean
}

// Component
const SmartFormFieldContainer = ({
  name,
  label,
  isRequired,
  description,
  isInvalid,
  errors,
  children,
  className,
  ...props
}: SmartFormFieldContainerProps) => {
  // Template
  return (
    <Field className={cn('group/field', className)} data-invalid={isInvalid} {...props}>
      <FieldLabel htmlFor={name}>
        {label} <span className='text-destructive'>{isRequired && '*'}</span>
      </FieldLabel>

      {children}

      {description && <FieldDescription>{description}</FieldDescription>}
      {isInvalid && <FieldError errors={errors} />}
    </Field>
  )
}

export default SmartFormFieldContainer
