import type { AppFieldExtendedReactFormApi, FormAsyncValidateOrFn, FormValidateOrFn } from '@tanstack/react-form'
import { toDate } from 'date-fns'
import { Minus } from 'lucide-react'
import React from 'react'
import { MultiSelect } from '@/components/molecules/multi-select'
import { NumberInput } from '@/components/molecules/number-input'
import { Combobox } from '@/components/ui/combobox'
import { DatePicker, DateRangePicker } from '@/components/ui/date-picker'
import { Field, FieldError } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { type AdvancedFilterFormValueInput, SmartFilterOperation, SmartFilterType, useFormContext } from './lib'
import { useSmartFilterContext } from './smart-filter'

// Component
const AdvancedFilterValueField = ({
  index,
  formFilterName,
  formFilterOperation,
  formFilterValueAdditional
}: {
  index: number
  formFilterName: AdvancedFilterFormValueInput['filters'][number]['name']
  formFilterOperation: AdvancedFilterFormValueInput['filters'][number]['operation']
  formFilterValueAdditional: AdvancedFilterFormValueInput['filters'][number]['value']['additional']
}) => {
  // Hooks
  const { filters } = useSmartFilterContext()
  const advancedFilterForm = useFormContext() as unknown as AppFieldExtendedReactFormApi<
    AdvancedFilterFormValueInput,
    FormValidateOrFn<AdvancedFilterFormValueInput> | undefined,
    FormValidateOrFn<AdvancedFilterFormValueInput> | undefined,
    FormAsyncValidateOrFn<AdvancedFilterFormValueInput> | undefined,
    FormValidateOrFn<AdvancedFilterFormValueInput> | undefined,
    FormAsyncValidateOrFn<AdvancedFilterFormValueInput> | undefined,
    FormValidateOrFn<AdvancedFilterFormValueInput> | undefined,
    FormAsyncValidateOrFn<AdvancedFilterFormValueInput> | undefined,
    FormValidateOrFn<AdvancedFilterFormValueInput> | undefined,
    FormAsyncValidateOrFn<AdvancedFilterFormValueInput> | undefined,
    FormAsyncValidateOrFn<AdvancedFilterFormValueInput> | undefined,
    unknown,
    Record<string, React.ComponentType<unknown>>,
    Record<string, React.ComponentType<unknown>>
  >

  // Memos
  // Selected filter
  const selectedFilter = React.useMemo(() => {
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
        return (
          <div className='flex items-center gap-4'>
            <advancedFilterForm.AppField name={`filters[${index}].value.additional.from`}>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <NumberInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      placeholder={`Enter from ${selectedFilter.label.toLowerCase()}`}
                      onFieldChange={field.handleChange}
                      onValueChange={(event) => {
                        field.handleChange(event.value)
                        if (+formFilterValueAdditional.to < +event.value) {
                          advancedFilterForm.setFieldValue(`filters[${index}].value.additional.to`, event.value)
                        }
                      }}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </advancedFilterForm.AppField>

            <Minus className='size-4 text-muted-foreground' />

            <advancedFilterForm.AppField name={`filters[${index}].value.additional.to`}>
              {(field) => {
                const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

                return (
                  <Field data-invalid={isInvalid}>
                    <NumberInput
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      aria-invalid={isInvalid}
                      placeholder={`Enter to ${selectedFilter.label.toLowerCase()}`}
                      min={formFilterValueAdditional.from}
                      onFieldChange={field.handleChange}
                      onValueChange={(event) => field.handleChange(event.value)}
                    />
                    {isInvalid && <FieldError errors={field.state.meta.errors} />}
                  </Field>
                )
              }}
            </advancedFilterForm.AppField>
          </div>
        )
      }

      // Others else
      return (
        <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

            return (
              <Field data-invalid={isInvalid}>
                <NumberInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value as string}
                  aria-invalid={isInvalid}
                  placeholder={`Enter ${selectedFilter.label.toLowerCase()}`}
                  onFieldChange={field.handleChange}
                  onValueChange={(event) => field.handleChange(event.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </advancedFilterForm.AppField>
      )
    }

    // Date
    case SmartFilterType.Date: {
      if (formFilterOperation === SmartFilterOperation.IsBetween) {
        return (
          <advancedFilterForm.AppField name={`filters[${index}].value.additional`}>
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid

              return (
                <Field data-invalid={isInvalid}>
                  <DateRangePicker
                    value={{
                      from: field.state.value.from ? new Date(field.state.value.from) : undefined,
                      to: field.state.value.to ? new Date(field.state.value.to) : undefined
                    }}
                    placeholder={`Select ${selectedFilter.label.toLowerCase()} range`}
                    onValueChange={(value) => {
                      field.handleChange({
                        from: value?.from?.toISOString() ?? '',
                        to: value?.to?.toISOString() ?? ''
                      })
                    }}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </advancedFilterForm.AppField>
        )
      }

      return (
        <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <DatePicker
                  value={field.state.value ? toDate(field.state.value as string) : null}
                  placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
                  onValueChange={(value) => {
                    field.handleChange(value?.toISOString() ?? '')
                  }}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </advancedFilterForm.AppField>
      )
    }

    // Select
    case SmartFilterType.Select: {
      if (formFilterOperation === SmartFilterOperation.HasAnyOf) {
        return (
          <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
            {(field) => {
              const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
              return (
                <Field data-invalid={isInvalid}>
                  <MultiSelect
                    value={field.state.value as string[]}
                    options={selectedFilter.options ?? []}
                    buttonTriggerProps={{
                      isLoading: !selectedFilter.options
                    }}
                    placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
                    onValueChange={field.handleChange}
                  />
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              )
            }}
          </advancedFilterForm.AppField>
        )
      }

      return (
        <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <Combobox
                  value={field.state.value as string}
                  options={selectedFilter.options ?? []}
                  buttonTriggerProps={{
                    isLoading: !selectedFilter.options
                  }}
                  placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
                  onValueChange={(value) => {
                    field.handleChange(value ?? '')
                  }}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </advancedFilterForm.AppField>
      )
    }

    // Select with infinite query
    case SmartFilterType.SelectWithInfiniteQuery: {
      return null
    }

    // Multi select
    case SmartFilterType.MultiSelect: {
      return (
        <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <MultiSelect
                  value={field.state.value as string[]}
                  options={selectedFilter.options ?? []}
                  buttonTriggerProps={{
                    isLoading: !selectedFilter.options
                  }}
                  placeholder={`Select ${selectedFilter.label.toLowerCase()}`}
                  onValueChange={field.handleChange}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </advancedFilterForm.AppField>
      )
    }

    // Default
    default: {
      return (
        <advancedFilterForm.AppField name={`filters[${index}].value.default`}>
          {(field) => {
            const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
            return (
              <Field data-invalid={isInvalid}>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  placeholder={`Enter ${selectedFilter.label.toLowerCase()}`}
                  aria-invalid={isInvalid}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                {isInvalid && <FieldError errors={field.state.meta.errors} />}
              </Field>
            )
          }}
        </advancedFilterForm.AppField>
      )
    }
  }
}

export default AdvancedFilterValueField
