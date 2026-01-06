import {
  type AppFieldExtendedReactFormApi,
  createFormHook,
  createFormHookContexts,
  type FormAsyncValidateOrFn,
  type FormValidateOrFn
} from '@tanstack/react-form'
import z from 'zod'
import { SmartFilterOperation, SmartFilterType } from './base'

// Create form hook
const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()
const { useAppForm, withForm } = createFormHook({
  fieldComponents: {},
  formComponents: {},
  fieldContext,
  formContext
})
export { useAppForm, useFieldContext, useFormContext, withForm }

// Basic search form
export const basicSearchFormSchema = z.object({
  keyword: z.string().trim()
})

export type BasicSearchFormValueInput = z.input<typeof basicSearchFormSchema>
export type BasicSearchFormValueOutput = z.output<typeof basicSearchFormSchema>
export const defaultBasicSearchFormValue: BasicSearchFormValueInput = { keyword: '' }

// Advanced filter form
export const advancedFilterFormSchema = z.object({
  filters: z.array(
    z
      .object({
        name: z.string().trim(),
        operation: z.enum(SmartFilterOperation),
        type: z.enum(SmartFilterType),
        value: z.object({
          default: z.union([z.string().trim(), z.array(z.string()).min(1, 'Please enter/select the information')]),
          additional: z.object({
            from: z.string(),
            to: z.string()
          })
        })
      })
      .superRefine((fieldValues, ctx) => {
        const { value, operation } = fieldValues

        if (operation === SmartFilterOperation.IsBetween) {
          if (value.additional.from === '') {
            ;['value.additional', 'value.additional.from'].forEach((path) => {
              ctx.addIssue({
                path: [path],
                message: 'Please enter/select the information',
                code: 'custom'
              })
            })
          }

          if (value.additional.to === '') {
            ;['value.additional', 'value.additional.to'].forEach((path) => {
              ctx.addIssue({
                path: [path],
                message: 'Please enter/select the information',
                code: 'custom'
              })
            })
          }
        } else {
          if (value.default === '') {
            ctx.addIssue({
              path: ['value.default'],
              message: 'Please enter/select the information',
              code: 'custom'
            })
          }
        }
      })
  )
})

export type AdvancedFilterFormValueInput = z.input<typeof advancedFilterFormSchema>
export type AdvancedFilterFormValueOutput = z.output<typeof advancedFilterFormSchema>
export const defaultAdvancedFilterFormValue: AdvancedFilterFormValueInput = { filters: [] }

export const useAdvancedFilterForm = () => {
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
  default: '',
  additional: {
    from: '',
    to: ''
  }
} as const

// Default string array value
export const defaultStringArrayValue: AdvancedFilterFormValueInput['filters'][number]['value'] = {
  default: '',
  additional: {
    from: '',
    to: ''
  }
} as const

// Default value per operation
export const defaultValuePerOperation: Record<
  SmartFilterOperation,
  AdvancedFilterFormValueInput['filters'][number]['value']
> = {
  [SmartFilterOperation.EqualsTo]: defaultStringValue,
  [SmartFilterOperation.DoesNotEqualTo]: defaultStringValue,
  [SmartFilterOperation.IsLessThan]: defaultStringValue,
  [SmartFilterOperation.IsLessThanOrEqualTo]: defaultStringValue,
  [SmartFilterOperation.IsGreaterThan]: defaultStringValue,
  [SmartFilterOperation.IsGreaterThanOrEqualTo]: defaultStringValue,
  [SmartFilterOperation.Contains]: defaultStringValue,
  [SmartFilterOperation.IsBetween]: defaultStringValue,
  [SmartFilterOperation.HasAnyOf]: defaultStringArrayValue,
  [SmartFilterOperation.HasAllOf]: defaultStringArrayValue
} as const
