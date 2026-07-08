import z from 'zod'

/**
 * @summary Get textarea field schema args type
 */

interface GetTextareaFieldSchemaArgs {
  max?: {
    value: number
    message: string
  }
  min?: {
    value: number
    message: string
  }
  required?: string
}

/**
 * @summary Get textarea field schema
 * @description This function is used to get the textarea field schema based on the field configuration
 * @type input: string
 * @type output: string
 */

export function getTextareaFieldSchema(args?: GetTextareaFieldSchemaArgs) {
  const { required, min, max } = args ?? {}

  let schema = z.string().trim()

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

  return schema
}

/**
 * @summary Textarea field input value type
 * @description This type is used to get the textarea field input value type
 */

export type TextareaFieldInputValue = z.input<ReturnType<typeof getTextareaFieldSchema>>
