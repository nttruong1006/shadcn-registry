import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxChipsInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxValue,
  useComboboxAnchor
} from '@/components/atoms/combobox'
import { Field, FieldError } from '@/components/atoms/field'
import type { AdvancedFilterValueFieldComponentProps } from './advanced-filter-value-field'
import type { FilterWithOptions } from './lib/base'
import { useAdvancedFilterForm } from './lib/form'

export default function AdvancedFilterValueSelectWithOptionsField({
  index,
  selectedFilter: selectedFilterProp,
  formFilterOperation
}: AdvancedFilterValueFieldComponentProps) {
  const anchor = useComboboxAnchor()
  const advancedFilterForm = useAdvancedFilterForm()
  const selectedFilter = selectedFilterProp as FilterWithOptions
  const items = (selectedFilter as FilterWithOptions).options

  // Template
  // Has any of
  if (formFilterOperation === 'hasAnyOf') {
    return (
      <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
        {(field) => {
          const selectedOptions = field.state.value as string[]
          const value = items.filter((item) => selectedOptions.includes(item.value))
          const invalid = field.state.meta.isTouched && !field.state.meta.isValid

          return (
            <Field data-invalid={invalid}>
              <Combobox
                items={items}
                multiple
                onValueChange={(value) => {
                  field.handleChange(value.map((item) => item.value))
                }}
                value={value}
              >
                <ComboboxChips ref={anchor}>
                  <ComboboxValue>
                    {(value: typeof items) => {
                      return value.map((item) => <ComboboxChip key={item.value}>{item.label}</ComboboxChip>)
                    }}
                  </ComboboxValue>
                  <ComboboxChipsInput
                    aria-invalid={invalid}
                    data-invalid={invalid}
                    placeholder={value.length > 0 ? '' : `Select ${selectedFilter.label.toLowerCase()}`}
                  />
                </ComboboxChips>

                <ComboboxContent anchor={anchor}>
                  <ComboboxEmpty>No items found.</ComboboxEmpty>
                  <ComboboxList>
                    {(item: (typeof items)[number]) => (
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

  // Others
  return (
    <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
      {(field) => {
        const value = items.find((item) => item.value === field.state.value) ?? null
        const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

        return (
          <Field data-invalid={isInvalid}>
            <Combobox
              items={items}
              onValueChange={(value) => {
                field.handleChange(value?.value ?? '')
              }}
              value={value}
            >
              <ComboboxInput
                aria-invalid={isInvalid}
                data-invalid={isInvalid}
                placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
              />
              <ComboboxContent>
                <ComboboxEmpty>No items found.</ComboboxEmpty>
                <ComboboxList>
                  {(item: (typeof items)[number]) => (
                    <ComboboxItem key={item.value} value={item}>
                      {item.label}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            {isInvalid && <FieldError errors={field.state.meta.errors} />}
          </Field>
        )
      }}
    </advancedFilterForm.AppField>
  )
}
