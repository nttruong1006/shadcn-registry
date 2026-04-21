import { MinusIcon } from 'lucide-react'
import { Field, FieldError } from '@/components/atoms/field'
import { NumberInput } from '@/components/molecules/number-input'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { useAdvancedFilterForm } from './lib/form'

export default function AdvancedFilterValueNumberField({
  index,
  selectedFilter,
  formFilterOperation,
  formFilterValueAdditional
}: AdvancedFilterValueFieldComponentProps) {
  const advancedFilterForm = useAdvancedFilterForm()

  // Template
  // Is between
  if (formFilterOperation === 'isBetween') {
    return (
      <div className='flex items-center gap-4'>
        <advancedFilterForm.AppField name={`filters[${index}].value.additional.from`}>
          {(field) => {
            const invalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={invalid}>
                <NumberInput
                  aria-invalid={invalid}
                  id={field.name}
                  name={field.name}
                  onFieldChange={(value) => field.handleChange(value.toString())}
                  onValueChange={(event) => {
                    field.handleChange(event.value)
                    if (+formFilterValueAdditional.to < +event.value) {
                      advancedFilterForm.setFieldValue(`filters[${index}].value.additional.to`, event.value)
                    }
                  }}
                  placeholder={`Enter from ${selectedFilter.label.toLowerCase()}`}
                  value={field.state.value}
                />
                {invalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </advancedFilterForm.AppField>

        <MinusIcon className='size-4 text-muted-foreground' />

        <advancedFilterForm.AppField name={`filters[${index}].value.additional.to`}>
          {(field) => {
            const invalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={invalid}>
                <NumberInput
                  aria-invalid={invalid}
                  id={field.name}
                  min={formFilterValueAdditional.from}
                  name={field.name}
                  onFieldChange={(value) => field.handleChange(value.toString())}
                  onValueChange={(event) => field.handleChange(event.value)}
                  placeholder={`Enter to ${selectedFilter.label.toLowerCase()}`}
                  value={field.state.value}
                />
                {invalid && <FieldError errors={field.state.meta.errors} />}
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
        const invalid = field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={invalid}>
            <NumberInput
              aria-invalid={invalid}
              id={field.name}
              name={field.name}
              onFieldChange={(value) => field.handleChange(value.toString())}
              onValueChange={(event) => field.handleChange(event.value)}
              placeholder={`Enter ${selectedFilter.label.toLowerCase()}`}
              value={field.state.value as string}
            />
            {invalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}
