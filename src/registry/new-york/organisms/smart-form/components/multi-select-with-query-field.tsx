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
import { Spinner } from '@/components/atoms/spinner'
import SmartFormFieldContainer from './field-container'
import type { BaseSmartFormFieldComponentProps } from './lib/base'
import { useFieldContext } from './lib/form'
import { useGetOptionsQuery } from './lib/query'
import type { MultiSelectFieldInputValue } from './lib/schemas/multi-select'

export default function MultiSelectWithQueryField({
  label,
  disabled,
  originalApiPath,
  dependencyFieldsValue,
  ...props
}: BaseSmartFormFieldComponentProps & Parameters<typeof useGetOptionsQuery>[0]) {
  const anchor = useComboboxAnchor()
  const field = useFieldContext<MultiSelectFieldInputValue>()

  const { getOptionsQuery, options } = useGetOptionsQuery({
    dependencyFieldsValue,
    originalApiPath
  })

  const value = options.filter((item) => field.state.value.includes(item.value))
  const invalid = field.state.meta.isTouched && !field.state.meta.isValid

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
          {getOptionsQuery.isFetching && <Spinner className='text-muted-foreground' />}

          <ComboboxValue>
            {(value: typeof options) => value.map((item) => <ComboboxChip key={item.value}>{item.label}</ComboboxChip>)}
          </ComboboxValue>

          <ComboboxChipsInput
            aria-invalid={invalid}
            data-invalid={invalid}
            disabled={disabled || getOptionsQuery.isFetching}
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
