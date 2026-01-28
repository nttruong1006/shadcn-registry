import { toDate } from 'date-fns'
import { MinusIcon } from 'lucide-react'
import { useMemo } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { MultiSelect } from '@/registry/new-york/molecules/multi-select/components/multi-select'
import { NumberInput } from '@/registry/new-york/molecules/number-input/components/number-input'
import { Combobox } from '@/registry/new-york/ui/combobox/components/combobox'
import { DatePicker, DateRangePicker } from '@/registry/new-york/ui/date-picker/components/date-picker'
import { Field, FieldError } from '@/registry/new-york/ui/field/components/field'
import { Input } from '@/registry/new-york/ui/input/components/input'
import { type SmartFilterFormInput, type SmartFilterFormOutput, SmartFilterOperation, SmartFilterType } from './lib'
import { useSmartFilterContext } from './smart-filter'

// Component
const AdvancedFilterValueField = ({ index }: { index: number }) => {
  // Hooks
  const { filters } = useSmartFilterContext()
  const form = useFormContext<SmartFilterFormInput, unknown, SmartFilterFormOutput>()
  const [formFilterName, formFilterOperation] = useWatch({
    name: [`filters.${index}.name`, `filters.${index}.operation`],
    control: form.control
  })

  // Memos
  // Selected filter
  const selectedFilter = useMemo(() => {
    return filters.find((filter) => filter.name === formFilterName)
  }, [filters, formFilterName])

  // Template
  if (!selectedFilter) {
    return null
  }

  switch (selectedFilter.type) {
    // Number
    case SmartFilterType.Number: {
      // Is between
      if (formFilterOperation === SmartFilterOperation.IsBetween) {
        const valueAdditionalWatcher = form.watch(`filters.${index}.value.additional`)

        return (
          <div className='flex items-center gap-4'>
            <Controller
              control={form.control}
              name={`filters.${index}.value.additional.from`}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <NumberInput
                    onFieldChange={field.onChange}
                    onValueChange={(event) => {
                      field.onChange(event.value)
                      if (+valueAdditionalWatcher.to < +event.value) {
                        form.setValue(`filters.${index}.value.additional.to`, event.value)
                      }
                    }}
                    placeholder={`Enter from ${selectedFilter.label.toLowerCase()}`}
                    value={field.value}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />

            <MinusIcon className='size-4 text-muted-foreground' />

            <Controller
              control={form.control}
              name={`filters.${index}.value.additional.to`}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <NumberInput
                    min={valueAdditionalWatcher.from}
                    onFieldChange={field.onChange}
                    onValueChange={(event) => field.onChange(event.value)}
                    placeholder={`Enter to ${selectedFilter.label.toLowerCase()}`}
                    value={field.value}
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </div>
        )
      }

      // Others else
      return (
        <Controller
          control={form.control}
          name={`filters.${index}.value.default`}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <NumberInput
                onFieldChange={field.onChange}
                onValueChange={(event) => field.onChange(event.value)}
                placeholder={`Enter ${selectedFilter.label.toLowerCase()}`}
                value={field.value as string}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    }

    // Date
    case SmartFilterType.Date: {
      if (formFilterOperation === SmartFilterOperation.IsBetween) {
        return (
          <Controller
            control={form.control}
            name={`filters.${index}.value.additional`}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <DateRangePicker
                  onValueChange={(value) => {
                    field.onChange({
                      from: value?.from?.toISOString() ?? '',
                      to: value?.to?.toISOString() ?? ''
                    })
                  }}
                  placeholder={`Select ${selectedFilter.label.toLowerCase()} range`}
                  value={{
                    from: field.value.from ? new Date(field.value.from) : undefined,
                    to: field.value.to ? new Date(field.value.to) : undefined
                  }}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        )
      }

      return (
        <Controller
          control={form.control}
          name={`filters.${index}.value.default`}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <DatePicker
                onValueChange={(value) => {
                  field.onChange(value?.toISOString() ?? '')
                }}
                placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
                value={field.value ? toDate(field.value as string) : null}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    }

    // Select
    case SmartFilterType.Select: {
      if (formFilterOperation === SmartFilterOperation.HasAnyOf) {
        return (
          <Controller
            control={form.control}
            name={`filters.${index}.value.default`}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <MultiSelect
                  buttonTriggerProps={{
                    isLoading: !selectedFilter.options
                  }}
                  onValueChange={field.onChange}
                  options={selectedFilter.options ?? []}
                  placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
                  value={field.value as string[]}
                />
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </Field>
            )}
          />
        )
      }

      return (
        <Controller
          control={form.control}
          name={`filters.${index}.value.default`}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Combobox
                buttonTriggerProps={{
                  isLoading: !selectedFilter.options
                }}
                onValueChange={(value) => {
                  field.onChange(value ?? '')
                }}
                options={selectedFilter.options ?? []}
                placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
                value={field.value as string}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    }

    // Select with infinite query
    case SmartFilterType.SelectWithInfiniteQuery: {
      return null
    }

    // Multi select
    case SmartFilterType.MultiSelect: {
      return (
        <Controller
          control={form.control}
          name={`filters.${index}.value.default`}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <MultiSelect
                buttonTriggerProps={{
                  isLoading: !selectedFilter.options
                }}
                onValueChange={field.onChange}
                options={selectedFilter.options ?? []}
                placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
                value={field.value as string[]}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    }

    // Default
    default: {
      return (
        <Controller
          control={form.control}
          name={`filters.${index}.value.default`}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <Input
                aria-invalid={fieldState.invalid}
                placeholder={`Enter ${selectedFilter.label.toLowerCase()}`}
                {...field}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      )
    }
  }
}

export default AdvancedFilterValueField
