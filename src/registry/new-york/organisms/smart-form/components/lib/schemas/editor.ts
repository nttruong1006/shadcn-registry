import z from 'zod'

/**
 * @summary Get editor field schema args type
 */

interface GetEditorFieldSchemaArgs {
  required?: string
}

/**
 * @summary Get editor field schema
 * @description This function is used to get the editor field schema based on the field configuration
 * @type input: string
 * @type output: string
 */

export function getEditorFieldSchema(args?: GetEditorFieldSchemaArgs) {
  const { required } = args ?? {}

  let schema = z.string().trim()

  // Required
  if (required) {
    schema = schema.min(1, required)
  }

  return schema
}

/**
 * @summary Editor field input value type
 * @description This type is used to get the editor field input value type
 */

export type EditorFieldInputValue = z.input<ReturnType<typeof getEditorFieldSchema>>
