import { MinusIcon } from 'lucide-react'
import { NumberInput } from '@/registry/new-york/molecules/number-input/components/number-input'
import { Field, FieldError } from '@/registry/new-york/ui/field/components/field.tsx'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { SmartFilterOperation } from './lib/base'
import { useAdvancedFilterForm } from './lib/form'

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
                  aria-invalid={isInvalid}
                  id={field.name}
                  name={field.name}
                  onFieldChange={field.handleChange}
                  onValueChange={(event) => {
                    field.handleChange(event.value)
                    if (+formFilterValueAdditional.to < +event.value) {
                      advancedFilterForm.setFieldValue(`filters[${index}].value.additional.to`, event.value)
                    }
                  }}
                  placeholder={`Enter from ${selectedFilter.label.toLowerCase()}`}
                  value={field.state.value}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </advancedFilterForm.AppField>

        <MinusIcon className='size-4 text-muted-foreground' />

        <advancedFilterForm.AppField name={`filters[${index}].value.additional.to`}>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <NumberInput
                  aria-invalid={isInvalid}
                  id={field.name}
                  min={formFilterValueAdditional.from}
                  name={field.name}
                  onFieldChange={field.handleChange}
                  onValueChange={(event) => field.handleChange(event.value)}
                  placeholder={`Enter to ${selectedFilter.label.toLowerCase()}`}
                  value={field.state.value}
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
              aria-invalid={isInvalid}
              id={field.name}
              name={field.name}
              onFieldChange={field.handleChange}
              onValueChange={(event) => field.handleChange(event.value)}
              placeholder={`Enter ${selectedFilter.label.toLowerCase()}`}
              value={field.state.value as string}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}

export default AdvancedFilterValueNumberField
