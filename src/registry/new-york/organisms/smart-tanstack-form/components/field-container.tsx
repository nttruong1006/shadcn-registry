import type React from 'react'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/components/ui/field'
import { cn } from '@/utils/ui'
import {
  type DependentGraph,
  type SmartFormData,
  type SmartFormFieldData,
  type SmartFormProps,
  useFieldContext
} from './lib'

export type FieldContainerProps = React.PropsWithChildren & {
  fieldData: SmartFormFieldData
}

export type FieldProps = Pick<SmartFormProps, 'disabledFields'> & {
  formData: SmartFormData
  fieldData: SmartFormFieldData
  dependentGraphRef: React.RefObject<DependentGraph | null>
}

// Component
const FieldContainer = ({ fieldData, children }: FieldContainerProps) => {
  // Hooks
  const field = useFieldContext()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <Field
      data-invalid={isInvalid}
      className={cn(
        'group/field col-span-full',
        {
          'flex-row-reverse': fieldData.type === 'checkbox'
        },
        fieldData.className
      )}
      orientation={fieldData.type === 'checkbox' ? 'horizontal' : 'vertical'}
    >
      <FieldLabel htmlFor={fieldData.code}>
        {fieldData.label} {fieldData.config?.validation?.required && '*'}
      </FieldLabel>

      {children}

      {fieldData.description && <FieldDescription>{fieldData.description}</FieldDescription>}
      {isInvalid && <FieldError errors={field.state.meta.errors} />}
    </Field>
  )
}

export default FieldContainer
