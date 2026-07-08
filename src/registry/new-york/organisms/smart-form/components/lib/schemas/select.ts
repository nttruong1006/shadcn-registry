import z from 'zod'

/**
 * @summary Get select field schema args type without required
 * @description Use function overloads to infer a different output type depending on the required option
 */

interface GetSelectFieldSchemaArgsWithoutRequired {
  required?: undefined
}

interface GetSelectFieldSchemaArgsWithRequired {
  required: string
}

/**
 * @summary Get select field schema type without required
 * @description Use function overloads to infer a different output type depending on the required option
 */

type GetSelectFieldSchemaWithoutRequired = z.ZodNullable<z.ZodString>

type GetSelectFieldSchemaWithRequired = z.ZodPipe<z.ZodNullable<z.ZodString>, z.ZodTransform<string, string | null>>

/**
 * @summary Get select field schema
 * @description This function is used to get the select field schema based on the field configuration
 * @type input: string | null
 * @type output (optional): string | null
 * @type output (required): string
 */

export function getSelectFieldSchema(
  args?: GetSelectFieldSchemaArgsWithoutRequired
): GetSelectFieldSchemaWithoutRequired

export function getSelectFieldSchema(args: GetSelectFieldSchemaArgsWithRequired): GetSelectFieldSchemaWithRequired

export function getSelectFieldSchema(
  args?: GetSelectFieldSchemaArgsWithoutRequired | GetSelectFieldSchemaArgsWithRequired
): GetSelectFieldSchemaWithoutRequired | GetSelectFieldSchemaWithRequired {
  const { required } = args ?? {}

  const schema = z.string().trim().nullable()

  // Required
  if (required) {
    return schema.transform((value, context) => {
      if (!value) {
        context.addIssue({
          code: 'custom',
          message: required
        })
        return z.NEVER
      }
      return value
    })
  }

  return schema
}

/**
 * @summary Select field input value type
 * @description This type is used to get the select field input value type
 */

export type SelectFieldInputValue = z.input<ReturnType<typeof getSelectFieldSchema>>
