import {
  Field,
  FieldDescription,
  FieldError,
  type FieldErrorProps,
  FieldLabel,
  type FieldProps
} from '@/components/atoms/field'
import { cn } from '@/utils/ui'
import { useFieldContext } from './lib/form'

export type SmartFormFieldContainerProps = FieldProps & {
  name: string
  required?: boolean
  label?: React.ReactNode
  description?: React.ReactNode
  invalid?: boolean
  errors?: FieldErrorProps['errors']
}

export type BaseSmartFormFieldFieldProps = Omit<SmartFormFieldContainerProps, 'name' | 'invalid' | 'errors'> & {
  disabled?: boolean
}

export default function SmartFormFieldContainer({
  name,
  label,
  required,
  description,
  invalid,
  errors,
  children,
  className,
  ...props
}: SmartFormFieldContainerProps) {
  const field = useFieldContext()

  return (
    <Field className={cn('group/field', className)} data-invalid={invalid} {...props}>
      <FieldLabel htmlFor={`${field.form.formId}-${field.name}`}>
        {label} <span className='text-destructive'>{required && '*'}</span>
      </FieldLabel>
      {children}
      {description && <FieldDescription>{description}</FieldDescription>}
      {invalid && <FieldError errors={errors} />}
    </Field>
  )
}
