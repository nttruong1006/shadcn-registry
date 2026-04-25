import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList
} from '@/components/atoms/combobox'
import type { Option } from '@/types/base'
import FieldContainer, { type BaseSmartFormFieldFieldProps } from './field-container'
import { useFieldContext } from './lib/form'
import type { SelectFieldInputValue } from './lib/schema'

export default function SelectWithOptionsField({
  label,
  disabled,
  options,
  ...props
}: BaseSmartFormFieldFieldProps & {
  options: Option[]
}) {
  const field = useFieldContext<SelectFieldInputValue>()
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
          disabled={disabled}
          id={`${field.form.formId}-${field.name}`}
          placeholder={typeof label === 'string' ? `Select ${label.toLowerCase()}` : undefined}
        />
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
