import z from 'zod'

/**
 * @summary Get number field schema args type
 */

interface GetNumberFieldSchemaArgs {
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
 * @summary Get number field schema
 * @description This function is used to get the number field schema based on the field configuration
 * @type input: number | string
 * @type output: number
 */

export function getNumberFieldSchema(args?: GetNumberFieldSchemaArgs) {
  const { required, min, max } = args ?? {}

  let schema = z.union([z.number(), z.string().trim()])

  // Required
  if (required) {
    schema = schema.refine((value) => value !== '', required)
  }

  // Min
  if (min) {
    schema = schema.refine((value) => +value >= min.value, min.message)
  }

  // Max
  if (max) {
    schema = schema.refine((value) => +value <= max.value, max.message)
  }

  return schema.transform((value) => (Number.isNaN(Number(value)) ? 0 : Number(value)))
}

/**
 * @summary Number field input value type
 * @description This type is used to get the number field input value type
 */

export type NumberFieldInputValue = z.input<ReturnType<typeof getNumberFieldSchema>>
