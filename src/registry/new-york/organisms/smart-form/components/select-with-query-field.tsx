import { useFormContext } from 'react-hook-form'
import { Combobox } from '@/components/ui/combobox'
import FieldContainer, { type FieldProps } from './field-container'
import { buildDependentGraph, getAllDependents, useOptionsQuery } from './lib'

// Component
const SelectWithQueryField = ({ formData, dependentGraphRef, fieldData, disabledFields }: FieldProps) => {
  // Hooks
  const { formState, setValue } = useFormContext()
  const { optionsQuery, options } = useOptionsQuery({ fieldData })

  // Template
  return (
    <FieldContainer fieldData={fieldData} disabledFields={disabledFields}>
      {({ field }) => (
        <Combobox
          {...field}
          options={options}
          placeholder={`Select ${fieldData.label.toLowerCase()}`}
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
            dependents.forEach((dependent) => {
              setValue(dependent, null, {
                shouldValidate: formState.submitCount > 0
              })
            })
          }}
        />
      )}
    </FieldContainer>
  )
}

export default SelectWithQueryField
