import type { FieldValues } from 'react-hook-form'
import type { SmartFormData, SmartFormFieldType } from './base'

// Default field values
export const defaultFieldValues: Record<SmartFormFieldType, string | number | boolean | null | string[]> = {
  input: '', // string
  textarea: '', // string
  'phone-number': '', // string
  number: '', // string | number
  password: '', // string
  'select-with-options': null, // string | null
  'select-with-query': null, // string | null
  'select-with-infinite-query': null, // string | null
  'multi-select-with-options': [], // string[]
  'multi-select-with-query': [], // string[]
  'multi-select-with-infinite-query': [], // string[]
  'autocomplete-with-options': '', // string
  'autocomplete-with-query': '', // string
  'autocomplete-with-infinite-query': '',
  date: null, // Date | null
  checkbox: false, // boolean
  radio: null, // string | null
  file: null, // File | ApiFile | null
  'multi-file': [], // File[] | ApiFile[]
  editor: '', // string
  label: null,
  slot: null
} as const

// Get default form value
export const getDefaultFormValue = (formData: SmartFormData, slots?: FieldValues) => {
  const defaultValues: FieldValues = {}
  for (const template of formData.templates) {
    for (const field of template.fields) {
      // LABEL fields
      if (field.type === 'label') {
        return
      }
      // Other fields
      defaultValues[field.code] = slots?.[field.code] ?? defaultFieldValues[field.type]
    }
  }
  return defaultValues
}
