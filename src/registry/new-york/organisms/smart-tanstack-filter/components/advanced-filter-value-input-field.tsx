import { Field, FieldError } from '@/registry/new-york/ui/field/components/field.tsx'
import { Input } from '@/registry/new-york/ui/input/components/input.tsx'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { useAdvancedFilterForm } from './lib/form'

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
              aria-invalid={isInvalid}
              id={field.name}
              name={field.name}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
              placeholder={`Enter ${selectedFilter.label.toLowerCase()}`}
              value={field.state.value}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}

export default AdvancedFilterValueInputField
