import { useFormContext } from 'react-hook-form'
import { Combobox } from '@/registry/new-york/ui/combobox/components/combobox'
import FieldContainer, { type FieldProps } from './field-container'
import { buildDependentGraph, getAllDependents } from './lib/dependency'
import { useOptionsQuery } from './lib/query'

// Component
const SelectWithQueryField = ({ formData, dependentGraphRef, fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const { formState, setValue } = useFormContext()
  const { optionsQuery, options } = useOptionsQuery({ fieldData })

  // Template
  return (
    <FieldContainer disabledFields={disabledFields} fieldData={fieldData}>
      {({ field }) => (
        <Combobox
          {...field}
          buttonTriggerProps={{
            id: fieldData.code,
            disabled: disabledFields?.[fieldData.code],
            isLoading: optionsQuery.isFetching
          }}
          onValueChange={(value) => {
            field.onChange(value)

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
        />
      )}
    </FieldContainer>
  )
}

export default SelectWithQueryField
