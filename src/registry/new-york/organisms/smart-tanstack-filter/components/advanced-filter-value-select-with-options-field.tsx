import { MultiSelect } from '@/components/molecules/multi-select'
import { Combobox } from '@/components/ui/combobox'
import { Field, FieldError } from '@/components/ui/field'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { SmartFilterOperation, useAdvancedFilterForm } from './lib'

// Component
const AdvancedFilterValueSelectWithOptionsField = ({
  index,
  selectedFilter,
  formFilterOperation
}: AdvancedFilterValueFieldComponentProps) => {
  // Hooks
  const advancedFilterForm = useAdvancedFilterForm()

  // Template
  // Has any of
  if (formFilterOperation === SmartFilterOperation.HasAnyOf) {
    return (
      <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
        {(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid}>
              <MultiSelect
                value={field.state.value as string[]}
                options={selectedFilter.options ?? []}
                placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
                onValueChange={field.handleChange}
              />
              {isInvalid && <FieldError errors={field.state.meta.errors} />}
            </Field>
          )
        }}
      </advancedFilterForm.AppField>
    )
  }

  // Others
  return (
    <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
      {(field) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={isInvalid}>
            <Combobox
              value={field.state.value as string}
              options={selectedFilter.options ?? []}
              placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
              onValueChange={(value) => {
                field.handleChange(value ?? '')
              }}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}

export default AdvancedFilterValueSelectWithOptionsField
