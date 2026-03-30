import { toDate } from 'date-fns'
import { DatePicker, DateRangePicker } from '@/registry/new-york/ui/date-picker/components/date-picker.tsx'
import { Field, FieldError } from '@/registry/new-york/ui/field/components/field.tsx'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { useAdvancedFilterForm } from './lib/form'

// Component
const AdvancedFilterValueDateField = ({
  index,
  selectedFilter,
  formFilterOperation
}: AdvancedFilterValueFieldComponentProps) => {
  // Hooks
  const advancedFilterForm = useAdvancedFilterForm()

  // Template
  // Is between
  if (formFilterOperation === 'isBetween') {
    return (
      <advancedFilterForm.AppField name={`filters[${index}].value.additional`}>
        {(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

          return (
            <Field data-invalid={isInvalid}>
              <DateRangePicker
                onValueChange={(value) => {
                  field.handleChange({
                    from: value?.from?.toISOString() ?? '',
                    to: value?.to?.toISOString() ?? ''
                  })
                }}
                placeholder={`Select ${selectedFilter.label.toLowerCase()} range`}
                value={{
                  from: field.state.value.from ? new Date(field.state.value.from) : undefined,
                  to: field.state.value.to ? new Date(field.state.value.to) : undefined
                }}
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
            <DatePicker
              onValueChange={(value) => {
                field.handleChange(value?.toISOString() ?? '')
              }}
              placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
              value={field.state.value ? toDate(field.state.value as string) : null}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}

export default AdvancedFilterValueDateField
