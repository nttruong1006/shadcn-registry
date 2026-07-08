import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor
} from '@/components/atoms/combobox'
import { Field, FieldError } from '@/components/atoms/field'
import { Spinner } from '@/components/atoms/spinner'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import type { FilterWithQuery } from './lib/base'
import { useAdvancedFilterForm } from './lib/form'
import { useGetOptionsQuery } from './lib/query'

export default function AdvancedFilterValueMultiSelectWithQueryField({
  index,
  selectedFilter: selectedFilterProp
}: AdvancedFilterValueFieldComponentProps) {
  const anchor = useComboboxAnchor()
  const advancedFilterForm = useAdvancedFilterForm()
  const selectedFilter = selectedFilterProp as FilterWithQuery

  const { options, getOptionsQuery } = useGetOptionsQuery({
    apiPath: selectedFilter.apiPath
  })

  return (
    <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
      {(field) => {
        const selectedOptions = field.state.value as string[]
        const value = options.filter((item) => selectedOptions.includes(item.value))
        const invalid = field.state.meta.isTouched && !field.state.meta.isValid

        return (
          <Field data-invalid={invalid}>
            <Combobox
              items={options}
              multiple
              onValueChange={(value) => {
                field.handleChange(value.map((item) => item.value))
              }}
              value={value}
            >
              <ComboboxChips ref={anchor}>
                {getOptionsQuery.isFetching && <Spinner className='text-muted-foreground' />}

                <ComboboxValue>
                  {(value: typeof options) =>
                    value.map((item) => <ComboboxChip key={item.value}>{item.label}</ComboboxChip>)
                  }
                </ComboboxValue>

                <ComboboxChipsInput
                  aria-invalid={invalid}
                  data-invalid={invalid}
                  disabled={getOptionsQuery.isFetching}
                  placeholder={value.length > 0 ? '' : `Select ${selectedFilter.label.toLowerCase()}`}
                />
              </ComboboxChips>

              <ComboboxContent anchor={anchor}>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: (typeof options)[number]) => (
                    <ComboboxItem key={item.value} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>

            {invalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}
