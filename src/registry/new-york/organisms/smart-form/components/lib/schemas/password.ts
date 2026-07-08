import z from 'zod'

/**
 * @summary Get password field schema args type
 */

interface GetPasswordFieldSchemaArgs {
  max?: {
    value: number
    message: string
  }
  min?: {
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
  required?: string
}

/**
 * @summary Get password field schema
 * @description This function is used to get the password field schema based on the field configuration
 * @type input: string
 * @type output: string
 */

export function getPasswordFieldSchema(args?: GetPasswordFieldSchemaArgs) {
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

/**
 * @summary Password field input value type
 * @description This type is used to get the password field input value type
 */

export type PasswordFieldInputValue = z.input<ReturnType<typeof getPasswordFieldSchema>>
