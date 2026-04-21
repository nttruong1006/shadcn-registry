import { toDate } from 'date-fns'
import { DatePicker, DateRangePicker } from '@/components/atoms/date-picker'
import { Field, FieldError } from '@/components/atoms/field'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { useAdvancedFilterForm } from './lib/form'

export default function AdvancedFilterValueDateField({
  index,
  selectedFilter,
  formFilterOperation
}: AdvancedFilterValueFieldComponentProps) {
  const advancedFilterForm = useAdvancedFilterForm()

  // Template
  // Is between
  if (formFilterOperation === 'isBetween') {
    return (
      <advancedFilterForm.AppField name={`filters[${index}].value.additional`}>
        {(field) => {
          const invalid = field.state.meta.isTouched && !field.state.meta.isValid

          return (
            <Field data-invalid={invalid}>
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
              {invalid && <FieldError errors={field.state.meta.errors} />}
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
        const invalid = field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={invalid}>
            <DatePicker
              onValueChange={(value) => {
                field.handleChange(value?.toISOString() ?? '')
              }}
              placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
              value={field.state.value ? toDate(field.state.value as string) : null}
            />
            {invalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}
