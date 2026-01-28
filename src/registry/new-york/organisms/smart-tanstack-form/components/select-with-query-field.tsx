import { useFormContext } from 'react-hook-form'
import { Combobox, type ComboboxProps } from '@/registry/new-york/ui/combobox/components/combobox'
import FieldContainer, { type FieldProps } from './field-container'
import { useFieldContext } from './lib/base'
import { buildDependentGraph, getAllDependents } from './lib/dependency'
import { useOptionsQuery } from './lib/query'

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
          for (const dependent of dependents) {
            setValue(dependent, null, {
              shouldValidate: formState.submitCount > 0
            })
          }
        }}
        options={options}
        placeholder={`Select ${fieldData.label.toLowerCase()}`}
        value={field.state.value}
      />
    </FieldContainer>
  )
}

export default SelectWithQueryField
