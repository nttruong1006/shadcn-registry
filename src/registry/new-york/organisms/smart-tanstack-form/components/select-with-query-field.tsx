import { useFormContext } from 'react-hook-form'
import { Combobox, type ComboboxProps } from '@/components/ui/combobox'
import FieldContainer, { type FieldProps } from './field-container'
import { buildDependentGraph, getAllDependents, useFieldContext, useOptionsQuery } from './lib'

// Component
const SelectWithQueryField = ({ formData, dependentGraphRef, fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const { formState, setValue } = useFormContext()
  const field = useFieldContext<ComboboxProps['value']>()
  const { optionsQuery, options } = useOptionsQuery({ fieldData })

  // Template
  return (
    <FieldContainer fieldData={fieldData}>
      <Combobox
        value={field.state.value}
        options={options}
        placeholder={`Select ${fieldData.label.toLowerCase()}`}
        buttonTriggerProps={{
          id: fieldData.code,
          disabled: disabledFields?.[fieldData.code],
          isLoading: optionsQuery.isFetching
        }}
        onValueChange={(value) => {
          field.handleChange(value)

          // Reset all dependent fields values
          if (!dependentGraphRef.current) {
            dependentGraphRef.current = buildDependentGraph(formData.templates.flatMap((template) => template.fields))
          }

          const dependents = getAllDependents(dependentGraphRef.current, fieldData.code)
          dependents.forEach((dependent) => {
            setValue(dependent, null, {
              shouldValidate: formState.submitCount > 0
            })
          })
        }}
      />
    </FieldContainer>
  )
}

export default SelectWithQueryField
