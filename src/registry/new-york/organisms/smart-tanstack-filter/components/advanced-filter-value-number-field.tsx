import { Minus } from 'lucide-react'
import { NumberInput } from '@/components/molecules/number-input'
import { Field, FieldError } from '@/components/ui/field'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { SmartFilterOperation, useAdvancedFilterForm } from './lib'

// Component
const AdvancedFilterValueNumberField = ({
  index,
  selectedFilter,
  formFilterOperation,
  formFilterValueAdditional
}: AdvancedFilterValueFieldComponentProps) => {
  // Hooks
  const advancedFilterForm = useAdvancedFilterForm()

  // Template
  // Is between
  if (formFilterOperation === SmartFilterOperation.IsBetween) {
    return (
      <div className='flex items-center gap-4'>
        <advancedFilterForm.AppField name={`filters[${index}].value.additional.from`}>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <NumberInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  aria-invalid={isInvalid}
                  placeholder={`Enter from ${selectedFilter.label.toLowerCase()}`}
                  onFieldChange={field.handleChange}
                  onValueChange={(event) => {
                    field.handleChange(event.value)
                    if (+formFilterValueAdditional.to < +event.value) {
                      advancedFilterForm.setFieldValue(`filters[${index}].value.additional.to`, event.value)
                    }
                  }}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </advancedFilterForm.AppField>

        <Minus className='size-4 text-muted-foreground' />

        <advancedFilterForm.AppField name={`filters[${index}].value.additional.to`}>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <NumberInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  aria-invalid={isInvalid}
                  placeholder={`Enter to ${selectedFilter.label.toLowerCase()}`}
                  min={formFilterValueAdditional.from}
                  onFieldChange={field.handleChange}
                  onValueChange={(event) => field.handleChange(event.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </advancedFilterForm.AppField>
      </div>
    )
  }

  // Others
  return (
    <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
      {(field) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={isInvalid}>
            <NumberInput
              id={field.name}
              name={field.name}
              value={field.state.value as string}
              aria-invalid={isInvalid}
              placeholder={`Enter ${selectedFilter.label.toLowerCase()}`}
              onFieldChange={field.handleChange}
              onValueChange={(event) => field.handleChange(event.value)}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}

export default AdvancedFilterValueNumberField
