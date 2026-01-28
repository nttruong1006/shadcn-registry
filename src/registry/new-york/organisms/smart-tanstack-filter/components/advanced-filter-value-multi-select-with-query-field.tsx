import { MultiSelect } from '@/registry/new-york/molecules/multi-select/components/multi-select'
import { Field, FieldError } from '@/registry/new-york/ui/field/components/field.tsx'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { useAdvancedFilterForm } from './lib/form'
import { useOptionsQuery } from './lib/query'

// Component
const AdvancedFilterValueMultiSelectWithQueryField = ({
  index,
  selectedFilter
}: AdvancedFilterValueFieldComponentProps) => {
  // Hooks
  const advancedFilterForm = useAdvancedFilterForm()
  const { options, optionsQuery } = useOptionsQuery({ apiPath: selectedFilter.apiPath })

  // Template
  if (!selectedFilter.apiPath) {
    return null
  }

  return (
    <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
      {(field) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={isInvalid}>
            <MultiSelect
              buttonTriggerProps={{
                isLoading: optionsQuery.isFetching
              }}
              onValueChange={field.handleChange}
              options={options}
              placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
              value={field.state.value as string[]}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}

export default AdvancedFilterValueMultiSelectWithQueryField
