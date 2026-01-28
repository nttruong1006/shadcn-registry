import { MultiSelect } from '@/registry/new-york/molecules/multi-select/components/multi-select'
import { Field, FieldError } from '@/registry/new-york/ui/field/components/field.tsx'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { useAdvancedFilterForm } from './lib/form'

// Component
const AdvancedFilterValueMultiSelectWithOptionsField = ({
  index,
  selectedFilter
}: AdvancedFilterValueFieldComponentProps) => {
  // Hooks
  const advancedFilterForm = useAdvancedFilterForm()

  // Template
  return (
    <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
      {(field) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={isInvalid}>
            <MultiSelect
              onValueChange={field.handleChange}
              options={selectedFilter.options ?? []}
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

export default AdvancedFilterValueMultiSelectWithOptionsField
