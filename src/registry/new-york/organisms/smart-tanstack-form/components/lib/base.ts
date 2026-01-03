import { type AppFieldExtendedReactFormApi, createFormHook, createFormHookContexts } from '@tanstack/react-form'
import type React from 'react'
import type { Accept } from 'react-dropzone'
import type { NumberInputProps } from '@/components/molecules/number-input'
import type { DatePickerProps } from '@/components/ui/date-picker'
import type { Option } from '@/types/base'

// Smart form data
export interface SmartFormData {
  code: string
  templates: Array<{
    code: string
    label: string
    description?: string
    className?: string
    fields: Array<{
      code: string
      label: string
      type:
        | 'input'
        | 'textarea'
        | 'number'
        | 'phone-number'
        | 'password'
        | 'select-with-options'
        | 'select-with-query'
        | 'select-with-infinite-query'
        | 'multi-select-with-options'
        | 'multi-select-with-query'
        | 'multi-select-with-infinite-query'
        | 'autocomplete-with-options'
        | 'autocomplete-with-query'
        | 'autocomplete-with-infinite-query'
        | 'date'
        | 'checkbox'
        | 'radio'
        | 'file'
        | 'multi-file'
        | 'editor'
        | 'label'
        | 'slot'
      config?: {
        validation?: Record<
          string,
          {
            /**
             * @field TEXT | TEXTAREA | PASSWORD | SELECT_OR_TEXT
             * @type required (boolean), min (number), max (number), email (boolean), regex({pattern: string, flags: string}), phone(string[])
             *
             * @field PASSWORD
             * @type required (boolean), min (number), max (number), regex({pattern: string, flags: string})
             *
             * @field SELECT | RADIO
             * @type required (boolean)
             *
             * @field NUMBER
             * @type min (number), max (number), negative (boolean), positive (boolean)
             *
             * @field MULTI_SELECT
             * @type required (boolean)
             *
             * @field DATE
             * @type required (boolean)
             *
             * @field FILE, MULTI_FILES
             * @type required (boolean), max_size (number), mime_types (string[])
             */
            value: boolean | number | { pattern: string; flags: string } | string[]
            message: string
          }
        >
        referenceFields?: Array<{
          code: string
          message: string
        }>
        // Number
        numberInputProps?: NumberInputProps
        // Date
        isPreviousDateDisabled?: boolean
        isNextDateDisabled?: boolean
        datePickerProps?: DatePickerProps
        // Select, multi select, select or text
        options?: Option[]
        apiPath?: string
        // File, multi file
        dropzoneOptions?: {
          maxFiles?: number
          maxSize?: number
          accept?: Accept
        }
        // Password
        isPasswordConfirmation?: boolean
      }
      description?: string
      className?: string
    }>
  }>
}

// Smart form field data
export type SmartFormFieldData = SmartFormData['templates'][number]['fields'][number]

// Smart form field type
export type SmartFormFieldType = SmartFormData['templates'][number]['fields'][number]['type']

// Form value
export type FormValue = Record<string, unknown>

// Smart form props
export interface SmartFormProps {
  // biome-ignore lint/suspicious/noExplicitAny: ignore
  form: AppFieldExtendedReactFormApi<any, any, any, any, any, any, any, any, any, any, any, any, any, any>
  formData: SmartFormData
  isUpdateMode?: boolean
  isPending?: boolean
  slots?: Record<string, React.ReactNode | undefined>
  hiddenFields?: Record<string, boolean | undefined>
  disabledFields?: Record<string, boolean | undefined>
  submitButtonText?: string
  actionButtonsClassName?: string
  updateConfirmationDialogSlot?: React.ReactNode
  cancel?: () => void
  validate?: (value: FormValue) => boolean | Promise<boolean>
  submit?: (value: FormValue) => void | Promise<void>
}

// Form
const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {},
  formComponents: {},
  fieldContext,
  formContext
})

export { useAppForm, useFieldContext, useFormContext }
