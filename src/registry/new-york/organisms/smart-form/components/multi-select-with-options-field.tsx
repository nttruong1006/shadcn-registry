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
import type { Option } from '@/types/base'
import SmartFormFieldContainer from './field-container'
import type { BaseSmartFormFieldComponentProps } from './lib/base'
import { useFieldContext } from './lib/form'
import type { MultiSelectFieldInputValue } from './lib/schemas/multi-select'

export default function MultiSelectWithOptionsField({
  label,
  disabled,
  options,
  ...props
}: BaseSmartFormFieldComponentProps & {
  options: Option[]
}) {
  const anchor = useComboboxAnchor()
  const field = useFieldContext<MultiSelectFieldInputValue>()
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid
  const selectedOptions = field.state.value as string[]
  const value = options.filter((item) => selectedOptions.includes(item.value))

  return (
    <SmartFormFieldContainer
      errors={field.state.meta.errors}
      invalid={invalid}
      label={label}
      name={field.name}
      {...props}
    >
      <Combobox
        items={options}
        multiple
        onValueChange={(value) => {
          field.handleChange(value.map((item) => item.value))
        }}
        value={value}
      >
        <ComboboxChips ref={anchor}>
          <ComboboxValue>
            {(value: typeof options) => value.map((item) => <ComboboxChip key={item.value}>{item.label}</ComboboxChip>)}
          </ComboboxValue>
          <ComboboxChipsInput
            aria-invalid={invalid}
            data-invalid={invalid}
            disabled={disabled}
            id={`${field.form.formId}-${field.name}`}
            placeholder={
              value.length > 0 ? undefined : `Select ${typeof label === 'string' ? label.toLowerCase() : 'information'}`
            }
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
    </SmartFormFieldContainer>
  )
}
