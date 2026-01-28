import { toDate } from 'date-fns'
import { isValidPhoneNumber } from 'react-phone-number-input'
import z from 'zod'
import type { UploadedFile } from '@/registry/new-york/molecules/file-upload/components/lib'

/*
 * Get input field schema
 * Input: string
 * Output: string
 */
interface GetInputFieldSchemaArgs {
  required?: string
  email?: string
  min?: {
    value: number
    message: string
  }
  max?: {
    value: number
    message: string
  }
  regex?: {
    value: {
      pattern: string
      flags: string
    }
    message: string
  }
}

export const getInputFieldSchema = (args?: GetInputFieldSchemaArgs) => {
  const { required, email, min, max, regex } = args ?? {}
  let fieldSchema = z.string().trim()

  // Email
  if (email) {
    fieldSchema = fieldSchema.refine((value) => {
      try {
        if (!(required || value)) {
          return true
        }
        return Boolean(z.email().parse(value))
      } catch {
        return false
      }
    }, email)

    return fieldSchema
  }

  // Required
  if (required) {
    fieldSchema = fieldSchema.min(1, required)
  }

  // Min
  if (min) {
    fieldSchema = fieldSchema.min(min.value, min.message)
  }

  // Max
  if (max) {
    fieldSchema = fieldSchema.max(max.value, max.message)
  }

  // Regex
  if (regex) {
    const value = regex.value as {
      pattern: string
      flags: string
    }
    fieldSchema = fieldSchema.regex(new RegExp(value.pattern, value.flags), regex.message)
  }

  return fieldSchema
}

export type InputFieldInputValue = z.input<ReturnType<typeof getInputFieldSchema>>
export type InputFieldOutputValue = z.output<ReturnType<typeof getInputFieldSchema>>

/*
 * Get textarea field schema
 * Input: string
 * Output: string
 */
interface GetTextareaFieldSchemaArgs {
  required?: string
  min?: {
    value: number
    message: string
  }
  max?: {
    value: number
    message: string
  }
}

export const getTextareaFieldSchema = (args?: GetTextareaFieldSchemaArgs) => {
  const { required, min, max } = args ?? {}

  let fieldSchema = z.string().trim()

  // Required
  if (required) {
    fieldSchema = fieldSchema.min(1, required)
  }

  // Min
  if (min) {
    fieldSchema = fieldSchema.min(min.value, min.message)
  }

  // Max
  if (max) {
    fieldSchema = fieldSchema.max(max.value, max.message)
  }

  return fieldSchema
}

export type TextareaFieldInputValue = z.input<ReturnType<typeof getTextareaFieldSchema>>
export type TextareaFieldOutputValue = z.output<ReturnType<typeof getTextareaFieldSchema>>

/*
 * Get number field schema
 * Input: string | number
 * Output: number
 */
interface GetNumberFieldSchemaArgs {
  required?: string
  min?: {
    value: number
    message: string
  }
  max?: {
    value: number
    message: string
  }
}

export const getNumberFieldSchema = (args?: GetNumberFieldSchemaArgs) => {
  const { required, min, max } = args ?? {}

  let fieldSchema = z.number()

  // Required
  if (required) {
    fieldSchema = fieldSchema.positive(required)
  }

  // Min
  if (min) {
    fieldSchema = fieldSchema.min(min.value, min.message)
  }

  // Max
  if (max) {
    fieldSchema = fieldSchema.max(max.value, max.message)
  }

  return z.preprocess((value: string | number) => (Number.isNaN(Number(value)) ? 0 : Number(value)), fieldSchema)
}

export type NumberFieldInputValue = z.input<ReturnType<typeof getNumberFieldSchema>>
export type NumberFieldOutputValue = z.output<ReturnType<typeof getNumberFieldSchema>>

/*
 * Get phone number field schema
 * Input: string
 * Output: string
 */
interface GetPhoneNumberFieldSchemaArgs {
  required?: string
  phone: string
}

export const getPhoneNumberFieldSchema = (args?: GetPhoneNumberFieldSchemaArgs) => {
  const { required, phone } = args ?? {}

  let fieldSchema = z.string().trim()

  // Required
  if (required) {
    fieldSchema = fieldSchema.min(1, required)
  }

  fieldSchema = fieldSchema.refine((value) => {
    try {
      if (!(required || value)) {
        return true
      }
      return isValidPhoneNumber(value)
    } catch {
      return false
    }
  }, phone)

  return fieldSchema
}

export type PhoneNumberFieldInputValue = z.input<ReturnType<typeof getPhoneNumberFieldSchema>>
export type PhoneNumberFieldOutputValue = z.output<ReturnType<typeof getPhoneNumberFieldSchema>>

/*
 * Get password field schema
 * Input: string
 * Output: string
 */
interface GetPasswordFieldSchemaArgs {
  required?: string
  min?: {
    value: number
    message: string
  }
  max?: {
    value: number
    message: string
  }
  regex?: {
    value: {
      pattern: string
      flags: string
    }
    message: string
  }
}

export const getPasswordFieldSchema = (args?: GetPasswordFieldSchemaArgs) => {
  const { required, min, max, regex } = args ?? {}

  let fieldSchema = z.string().trim()

  // Required
  if (required) {
    fieldSchema = fieldSchema.min(1, required)
  }

  // Min
  if (min) {
    fieldSchema = fieldSchema.min(min.value, min.message)
  }

  // Max
  if (max) {
    fieldSchema = fieldSchema.max(max.value, max.message)
  }

  // Regex
  if (regex) {
    const value = regex.value as {
      pattern: string
      flags: string
    }
    fieldSchema = fieldSchema.regex(new RegExp(value.pattern, value.flags), regex.message)
  }

  return fieldSchema
}

export type PasswordFieldInputValue = z.input<ReturnType<typeof getPasswordFieldSchema>>
export type PasswordFieldOutputValue = z.output<ReturnType<typeof getPasswordFieldSchema>>

/*
 * Get select field schema
 * Input: string | null
 * Output: string | null
 */
interface GetSelectFieldSchemaArgs {
  required?: string
}

export const getSelectFieldSchema = (args?: GetSelectFieldSchemaArgs) => {
  const { required } = args ?? {}

  let fieldSchema = z.string().trim().nullable()

  // Required
  if (required) {
    fieldSchema = fieldSchema.refine((value) => value != null, required)
  }

  return fieldSchema
}

export type SelectFieldInputValue = z.input<ReturnType<typeof getSelectFieldSchema>>
export type SelectFieldOutputValue = z.output<ReturnType<typeof getSelectFieldSchema>>

/*
 * Get multi select field schema
 * Input: string[]
 * Output: string[]
 */
interface GetMultiSelectFieldSchemaArgs {
  required?: string
}

export const getMultiSelectFieldSchema = (args?: GetMultiSelectFieldSchemaArgs) => {
  const { required } = args ?? {}

  let fieldSchema = z.array(z.string())

  // Required
  if (required) {
    fieldSchema = fieldSchema.min(1, required)
  }

  return fieldSchema
}

export type MultiSelectFieldInputValue = z.input<ReturnType<typeof getMultiSelectFieldSchema>>
export type MultiSelectFieldOutputValue = z.output<ReturnType<typeof getMultiSelectFieldSchema>>

/*
 * Get autocomplete field schema
 * Input: string
 * Output: string
 */
type GetAutocompleteFieldSchemaArgs = GetInputFieldSchemaArgs

export const getAutocompleteFieldSchema = (args?: GetAutocompleteFieldSchemaArgs) => {
  return getInputFieldSchema(args)
}

export type AutocompleteFieldInputValue = z.input<ReturnType<typeof getAutocompleteFieldSchema>>
export type AutocompleteFieldOutputValue = z.output<ReturnType<typeof getAutocompleteFieldSchema>>

/*
 * Get date field schema
 * Input: string | Date | null
 * Output: string | null
 */
interface GetDateFieldSchemaArgs {
  required?: string
}

export const getDateFieldSchema = (args?: GetDateFieldSchemaArgs) => {
  const { required } = args ?? {}

  let fieldSchema = z.codec(z.union([z.iso.datetime(), z.date()]).nullable(), z.iso.datetime().nullable(), {
    decode: (value) => {
      if (!value) {
        return null
      }
      if (typeof value === 'string') {
        return value
      }
      return value.toISOString()
    },
    encode: (value) => (value ? toDate(value) : null)
  })

  // Required
  if (required) {
    fieldSchema = fieldSchema.refine(Boolean, required)
  }

  return fieldSchema
}

export type DateFieldInputValue = z.input<ReturnType<typeof getDateFieldSchema>>
export type DateFieldOutputValue = z.output<ReturnType<typeof getDateFieldSchema>>

/*
 * Get editor field schema
 * Input: string
 * Output: string
 */
interface GetEditorFieldSchemaArgs {
  required?: string
}

export const getEditorFieldSchema = (args?: GetEditorFieldSchemaArgs) => {
  const { required } = args ?? {}

  let fieldSchema = z.string().trim()

  // Required
  if (required) {
    fieldSchema = fieldSchema.min(1, required)
  }

  return fieldSchema
}

export type EditorFieldInputValue = z.input<ReturnType<typeof getEditorFieldSchema>>
export type EditorFieldOutputValue = z.output<ReturnType<typeof getEditorFieldSchema>>

/*
 * Get checkbox field schema
 * Input: boolean
 * Output: boolean
 */
export const getCheckboxFieldSchema = () => {
  return z.boolean()
}

export type CheckboxFieldInputValue = z.input<ReturnType<typeof getCheckboxFieldSchema>>
export type CheckboxFieldOutputValue = z.output<ReturnType<typeof getCheckboxFieldSchema>>

/*
 * Get file field schema
 * Input: File | UploadedFile | null
 * Output: File | UploadedFile | null
 */
interface GetFileFieldSchemaArgs {
  required?: string
}

export const getFileFieldSchema = (args?: GetFileFieldSchemaArgs) => {
  const { required } = args ?? {}

  let fieldSchema = z.custom<File | UploadedFile | null>()

  // Required
  if (required) {
    fieldSchema = fieldSchema.refine(Boolean, required)
  }

  return fieldSchema
}

export type FileFieldInputValue = z.input<ReturnType<typeof getFileFieldSchema>>
export type FileFieldOutputValue = z.output<ReturnType<typeof getFileFieldSchema>>

/*
 * Get multi file field schema
 * Input: Array<File | UploadedFile>
 * Output: Array<File | UploadedFile>
 */
interface GetMultiFileFieldSchemaArgs {
  required?: string
}

export const getMultiFileFieldSchema = (args?: GetMultiFileFieldSchemaArgs) => {
  const { required } = args ?? {}

  let fieldSchema = z.array(z.custom<File | UploadedFile>())

  // Required
  if (required) {
    fieldSchema = fieldSchema.min(1, required)
  }

  return fieldSchema
}

export type MultiFileFieldInputValue = z.input<ReturnType<typeof getMultiFileFieldSchema>>
export type MultiFileFieldOutputValue = z.output<ReturnType<typeof getMultiFileFieldSchema>>
