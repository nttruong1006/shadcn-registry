import {
  type AppFieldExtendedReactFormApi,
  createFormHook,
  createFormHookContexts,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn
} from '@tanstack/react-form'
import z from 'zod'
import type { Option } from '@/types/base'
import { type SmartFilterOperation, smartFilterOperations, smartFilterTypes } from './base'

// Create form hook
const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()
const { useAppForm, withForm } = createFormHook({
  fieldComponents: {},
  fieldContext,
  formComponents: {},
  formContext
})

export { useAppForm, useFieldContext, useFormContext, withForm }

// Basic search form
export const basicSearchFormSchema = z.object({
  keyword: z.string().trim()
})

export type BasicSearchFormValueInput = z.input<typeof basicSearchFormSchema>
export type BasicSearchFormValueOutput = z.output<typeof basicSearchFormSchema>
export const defaultBasicSearchFormValue: BasicSearchFormValueInput = {
  keyword: ''
}

// Advanced filter form
export const advancedFilterFormSchema = z.object({
  filters: z.array(
    z
      .object({
        name: z.string().trim(),
        operation: z.literal(smartFilterOperations),
        type: z.literal(smartFilterTypes),
        value: z.object({
          additional: z.object({
            from: z.string(),
            to: z.string()
          }),
          default: z.union([z.string().trim(), z.array(z.string()).min(1, 'Please enter/select the information')])
        })
      })
      .superRefine((fieldValues, ctx) => {
        const { value, operation } = fieldValues

        if (operation === 'isBetween') {
          if (value.additional.from === '') {
            const invalidFields = ['value.additional', 'value.additional.from']
            for (const invalidField of invalidFields) {
              ctx.addIssue({
                code: 'custom',
                message: 'Please enter/select the information',
                path: [invalidField]
              })
            }
          }

          if (value.additional.to === '') {
            const invalidFields = ['value.additional', 'value.additional.to']
            for (const invalidField of invalidFields) {
              ctx.addIssue({
                code: 'custom',
                message: 'Please enter/select the information',
                path: [invalidField]
              })
            }
          }
        } else if (value.default === '') {
          ctx.addIssue({
            code: 'custom',
            message: 'Please enter/select the information',
            path: ['value.default']
          })
        }
      })
  )
})

export type AdvancedFilterFormValueInput = z.input<typeof advancedFilterFormSchema>
export type AdvancedFilterFormValueOutput = z.output<typeof advancedFilterFormSchema>
export const defaultAdvancedFilterFormValue: AdvancedFilterFormValueInput = {
  filters: []
}

export function useAdvancedFilterForm() {
  return useFormContext() as unknown as AppFieldExtendedReactFormApi<
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
}

// Default string value
export const defaultStringValue: AdvancedFilterFormValueInput['filters'][number]['value'] = {
  additional: {
    from: '',
    to: ''
  },
  default: ''
} as const

// Default string array value
export const defaultStringArrayValue: AdvancedFilterFormValueInput['filters'][number]['value'] = {
  additional: {
    from: '',
    to: ''
  },
  default: []
} as const

// Default value per operation
export const defaultValuePerOperation: Record<
  SmartFilterOperation,
  AdvancedFilterFormValueInput['filters'][number]['value']
> = {
  contains: defaultStringValue,
  doesNotEqualTo: defaultStringValue,
  equalsTo: defaultStringValue,
  hasAllOf: defaultStringArrayValue,
  hasAnyOf: defaultStringArrayValue,
  isBetween: defaultStringValue,
  isGreaterThan: defaultStringValue,
  isGreaterThanOrEqualTo: defaultStringValue,
  isLessThan: defaultStringValue,
  isLessThanOrEqualTo: defaultStringValue
} as const

/**
 * @summary Update selected item reference because queryData will be changed after refetching
 */
export function updateSelectedItemReferencesAndGetItems({
  value,
  queryData
}: {
  value: Option | Option[] | null
  queryData: Option[]
}): Option[] {
  // Multiple
  if (Array.isArray(value)) {
    if (value.length > 0) {
      queryData.forEach((item, index) => {
        const valueIndex = value.findIndex((valueItem) => valueItem.value === item.value)
        if (valueIndex >= 0) {
          queryData[index] = value[valueIndex]
        }
      })
    }

    return queryData
  }

  // Single
  if (value) {
    const valueIndex = queryData.findIndex((item) => item.value === value.value)
    if (valueIndex >= 0) {
      queryData[valueIndex] = value
    }
  }

  return queryData
}
