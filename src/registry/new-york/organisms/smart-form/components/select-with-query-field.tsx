import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from '@/components/atoms/combobox'
import { InputGroupAddon } from '@/components/atoms/input-group'
import { Spinner } from '@/components/atoms/spinner'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/form'
import { useGetOptionsQuery } from './lib/query'
import type { SelectFieldInputValue } from './lib/schema'

export default function SelectWithQueryField({
  label,
  disabled,
  originalApiPath,
  dependencyFieldsValue,
  ...props
}: BaseSmartFormFieldFieldProps & Parameters<typeof useGetOptionsQuery>[0]) {
  const field = useFieldContext<SelectFieldInputValue>()

  const { getOptionsQuery, options } = useGetOptionsQuery({
    originalApiPath,
    dependencyFieldsValue
  })

  const value = options.find((item) => item.value === field.state.value) ?? null
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

  return (
    <FieldContainer errors={field.state.meta.errors} invalid={invalid} label={label} name={field.name} {...props}>
      <Combobox
        items={options}
        onValueChange={(value) => {
          field.handleChange(value?.value ?? null)
        }}
        value={value}
      >
        <ComboboxInput
          aria-invalid={invalid}
          data-invalid={invalid}
          disabled={disabled || getOptionsQuery.isFetching}
          id={`${field.form.formId}-${field.name}`}
          placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        >
          {getOptionsQuery.isFetching && (
            <InputGroupAddon align='inline-start'>
              <Spinner />
            </InputGroupAddon>
          )}
        </ComboboxInput>

        <ComboboxContent>
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
    </FieldContainer>
  )
}
