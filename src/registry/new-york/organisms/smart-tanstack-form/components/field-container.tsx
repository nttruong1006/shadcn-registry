import type { PropsWithChildren, RefObject } from 'react'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/registry/new-york/ui/field/components/field'
import { cn } from '@/utils/ui'
import { type SmartFormData, type SmartFormFieldData, type SmartFormProps, useFieldContext } from './lib/base'
import type { DependentGraph } from './lib/dependency'

export type FieldContainerProps = PropsWithChildren & {
  fieldData: SmartFormFieldData
}

export type FieldProps = Pick<SmartFormProps, 'disabledFields'> & {
  formData: SmartFormData
  fieldData: SmartFormFieldData
  dependentGraphRef: RefObject<DependentGraph | null>
}

// Component
const FieldContainer = ({ fieldData, children }: FieldContainerProps) => {
  // Hooks
  const field = useFieldContext()
  const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

  // Template
  return (
    <Field
      className={cn(
        'group/field col-span-full',
        {
          'flex-row-reverse': fieldData.type === 'checkbox'
        },
        fieldData.className
      )}
      data-invalid={isInvalid}
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
