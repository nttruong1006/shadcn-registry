import { Field, FieldError } from '@/components/atoms/field'
import { Input } from '@/components/atoms/input'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { useAdvancedFilterForm } from './lib/form'

export default function AdvancedFilterValueInputField({
  index,
  selectedFilter
}: AdvancedFilterValueFieldComponentProps) {
  const advancedFilterForm = useAdvancedFilterForm()

  return (
    <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
      {(field) => {
        const invalid = field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={invalid}>
            <Input
              aria-invalid={invalid}
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder={`Enter ${selectedFilter.label.toLowerCase()}`}
              value={field.state.value}
            />
            {invalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}
