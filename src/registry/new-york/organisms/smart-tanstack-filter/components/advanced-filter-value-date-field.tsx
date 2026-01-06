import { toDate } from 'date-fns'
import { DatePicker, DateRangePicker } from '@/components/ui/date-picker'
import { Field, FieldError } from '@/components/ui/field'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { SmartFilterOperation, useAdvancedFilterForm } from './lib'

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
  if (formFilterOperation === SmartFilterOperation.IsBetween) {
    return (
      <advancedFilterForm.AppField name={`filters[${index}].value.additional`}>
        {(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

          return (
            <Field data-invalid={isInvalid}>
              <DateRangePicker
                value={{
                  from: field.state.value.from ? new Date(field.state.value.from) : undefined,
                  to: field.state.value.to ? new Date(field.state.value.to) : undefined
                }}
                placeholder={`Select ${selectedFilter.label.toLowerCase()} range`}
                onValueChange={(value) => {
                  field.handleChange({
                    from: value?.from?.toISOString() ?? '',
                    to: value?.to?.toISOString() ?? ''
                  })
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
              value={field.state.value ? toDate(field.state.value as string) : null}
              placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
              onValueChange={(value) => {
                field.handleChange(value?.toISOString() ?? '')
              }}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}

export default AdvancedFilterValueDateField
