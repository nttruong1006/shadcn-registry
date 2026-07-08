import z from 'zod'

/**
 * @summary Get input field schema args type
 */

interface GetInputFieldSchemaArgs {
  email?: string
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
  url?: string
}

/**
 * @summary Get input field schema
 * @description This function is used to get the input field schema based on the field configuration.
 * @type input: string
 * @type output: string
 */

export function getInputFieldSchema(args?: GetInputFieldSchemaArgs) {
  const { required, email, url, min, max, regex } = args ?? {}

  let schema = z.string().trim()

  // Email
  if (email) {
    // Required
    if (required) {
      schema = schema.min(1, required)
    }

    // Email
    schema = schema.refine((value) => {
      const isOptionalAndEmpty = !(required || value)
      return isOptionalAndEmpty || z.email().safeParse(value).success
    }, email)

    return schema
  }

  // Url
  if (url) {
    // Required
    if (required) {
      schema = schema.min(1, required)
    }

    // Url
    schema = schema.refine((value) => {
      const isOptionalAndEmpty = !(required || value)
      return isOptionalAndEmpty || z.url().safeParse(value).success
    }, url)

    return schema
  }

  // Required
  if (required) {
    schema = schema.min(1, required)
  }

  // Min
  if (min) {
    schema = schema.min(min.value, min.message)
  }

  // Max
  if (max) {
    schema = schema.max(max.value, max.message)
  }

  // Regex
  if (regex) {
    schema = schema.regex(new RegExp(regex.value.pattern, regex.value.flags), regex.message)
  }

  return schema
}

/**
 * @summary Input field input value type
 * @description This type is used to get the input field input value type
 */

export type InputFieldInputValue = z.input<ReturnType<typeof getInputFieldSchema>>
