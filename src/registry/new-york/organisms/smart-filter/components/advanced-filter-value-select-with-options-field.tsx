import { Combobox } from '@/components/atoms/combobox'
import { Field, FieldError } from '@/components/atoms/field'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { useAdvancedFilterForm } from './lib/form'

export default function AdvancedFilterValueSelectWithOptionsField({
  index,
  selectedFilter,
  formFilterOperation
}: AdvancedFilterValueFieldComponentProps) {
  const advancedFilterForm = useAdvancedFilterForm()

  // Template
  // Has any of
  if (formFilterOperation === 'hasAnyOf') {
    return (
      <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
        {(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid}>
              {/* <MultiSelect
                onValueChange={field.handleChange}
                options={'options' in selectedFilter ? selectedFilter.options : []}
                placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
                value={field.state.value as string[]}
              /> */}
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
              items={'options' in selectedFilter ? selectedFilter.options : []}
              onValueChange={(value) => {
                field.handleChange(value ?? '')
              }}
              // placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
              value={field.state.value as string}
            />
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}
