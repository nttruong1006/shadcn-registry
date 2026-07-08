import z from 'zod'

/**
 * @summary Get multi select field schema args type
 */

interface GetMultiSelectFieldSchemaArgs {
  required?: string
}

/**
 * @summary Get multi select field schema
 * @description This function is used to get the multi select field schema based on the field configuration
 * @type input: string[]
 * @type output: string[]
 */

export function getMultiSelectFieldSchema(args?: GetMultiSelectFieldSchemaArgs) {
  const { required } = args ?? {}

  let fieldSchema = z.array(z.string())

  // Required
  if (required) {
    fieldSchema = fieldSchema.min(1, required)
  }

  return fieldSchema
}

/**
 * @summary Multi select field input value type
 * @description This type is used to get the multi select field input value type
 */

export type MultiSelectFieldInputValue = z.input<ReturnType<typeof getMultiSelectFieldSchema>>
