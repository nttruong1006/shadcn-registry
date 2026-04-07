import { Field, FieldError } from '@/components/atoms/field'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import { useAdvancedFilterForm } from './lib/form'

export default function AdvancedFilterValueMultiSelectWithQueryField({
  index,
  selectedFilter
}: AdvancedFilterValueFieldComponentProps) {
  const advancedFilterForm = useAdvancedFilterForm()
  // const { options, optionsQuery } = useOptionsQuery({
  //   apiPath: 'apiPath' in selectedFilter ? selectedFilter.apiPath : undefined
  // })

  // Template
  if (!('apiPath' in selectedFilter)) {
    return null
  }

  return (
    <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
      {(field) => {
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
        return (
          <Field data-invalid={isInvalid}>
            {/* <MultiSelect
              buttonTriggerProps={{
                isLoading: optionsQuery.isFetching
              }}
              onValueChange={field.handleChange}
              options={options}
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
