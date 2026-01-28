import { Controller, type ControllerProps, type FieldPath, type FieldValues, useFormContext } from 'react-hook-form'
import { Field, FieldDescription, FieldError, FieldLabel } from '@/registry/new-york/ui/field/components/field'
import { cn } from '@/utils/ui'
import type { SmartFormData, SmartFormFieldData, SmartFormProps } from './lib/base'
import type { DependentGraph } from './lib/dependency'

export type FieldContainerProps<
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
> = Pick<SmartFormProps, 'disabledFields'> & {
  fieldData: SmartFormFieldData
  children: (
    props: Pick<SmartFormProps, 'disabledFields'> &
      Parameters<ControllerProps<TFieldValues, TName, TTransformedValues>['render']>[0] & {
        fieldData: SmartFormFieldData
      }
  ) => React.ReactNode
}

export type FieldProps = Omit<FieldContainerProps, 'children'> & {
  formData: SmartFormData
  dependentGraphRef: React.RefObject<DependentGraph | null>
}

// Component
const FieldContainer = <
  TFieldValues extends FieldValues = FieldValues,
  TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
  TTransformedValues = TFieldValues
>({
  fieldData,
  disabledFields,
  children
}: FieldContainerProps<TFieldValues, TName, TTransformedValues>) => {
  // Hooks
  const form = useFormContext<TFieldValues, TName, TTransformedValues>()

  // Template
  return (
    <Controller
      control={form.control}
      name={fieldData.code as TName}
      render={({ field, fieldState, formState }) => {
        return (
          <Field
            className={cn(
              'group/field col-span-full',
              {
                'flex-row-reverse': fieldData.type === 'checkbox'
              },
              fieldData.className
            )}
            data-invalid={fieldState.invalid}
            orientation={fieldData.type === 'checkbox' ? 'horizontal' : 'vertical'}
          >
            <FieldLabel htmlFor={fieldData.code}>
              {fieldData.label} {fieldData.config?.validation?.required && '*'}
            </FieldLabel>

            {children({
              field,
              fieldState,
              formState,
              fieldData,
              disabledFields
            })}

            {fieldData.description && <FieldDescription>{fieldData.description}</FieldDescription>}
            {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
          </Field>
        )
      }}
    />
  )
}

export default FieldContainer
