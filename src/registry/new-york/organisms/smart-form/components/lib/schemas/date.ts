import { isDate } from 'date-fns'
import z from 'zod'

/**
 * @summary Get date field schema args type
 * @description Use function overloads to infer a different output type depending on the required option
 */

interface GetDateFieldSchemaArgsWithoutRequired {
  required?: undefined
}

interface GetDateFieldSchemaArgsWithRequired {
  required: string
}

/**
 * @summary Get date field schema type
 * @description Use function overloads to infer a different output type depending on the required option
 */

type GetDateFieldSchemaWithoutRequired = z.ZodPreprocess<
  z.ZodPipe<z.ZodUnion<readonly [z.ZodDate, z.ZodNull]>, z.ZodTransform<string | null, Date | null>>
>

type GetDateFieldSchemaWithRequired = z.ZodPreprocess<
  z.ZodPipe<z.ZodUnion<readonly [z.ZodDate, z.ZodNull]>, z.ZodTransform<string, Date | null>>
>

/**
 * @summary Get date field schema
 * @description This function is used to get the date field schema based on the field configuration
 * @type input: iso string | Date | null
 * @type output (optional): iso string | null
 * @type output (required): iso string
 */

export function getDateFieldSchema(args?: GetDateFieldSchemaArgsWithoutRequired): GetDateFieldSchemaWithoutRequired

export function getDateFieldSchema(args: GetDateFieldSchemaArgsWithRequired): GetDateFieldSchemaWithRequired

export function getDateFieldSchema(
  args?: GetDateFieldSchemaArgsWithoutRequired | GetDateFieldSchemaArgsWithRequired
): GetDateFieldSchemaWithoutRequired | GetDateFieldSchemaWithRequired {
  const { required } = args ?? {}

  const preprocessFn = (value: Date | string | null) => (isDate(value) ? value : null)

  // Required
  if (required) {
    return z.preprocess(
      preprocessFn,
      z.union([z.date(), z.null()]).transform((value, context) => {
        if (!value) {
          context.addIssue({
            code: 'custom',
            message: required
          })
          return z.NEVER
        }
        return value.toISOString()
      })
    )
  }

  return z.preprocess(
    preprocessFn,
    z.union([z.date(), z.null()]).transform((value) => (value ? value.toISOString() : null))
  )
}

/**
 * @summary Date field input value type
 * @description This type is used to get the date field input value type
 */

export type DateFieldInputValue = Date | null
