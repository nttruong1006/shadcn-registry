import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { useAdvancedFilterForm } from './lib'

// Component
const AdvancedFilterValueInputField = ({ index, selectedFilter }: AdvancedFilterValueFieldComponentProps) => {
  // Hooks
  const advancedFilterForm = useAdvancedFilterForm()

  // Template
  return (
    <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
      {(field) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={isInvalid}>
            <Input
              id={field.name}
              name={field.name}
              value={field.state.value}
              placeholder={`Enter ${selectedFilter.label.toLowerCase()}`}
              aria-invalid={isInvalid}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}

export default AdvancedFilterValueInputField
