import z from 'zod'
import type { UploadedFile } from '@/components/molecules/file-upload/lib'

/**
 * @summary Get file field schema args type
 * @description Use function overloads to infer a different output type depending on the required option
 */

interface GetFileFieldSchemaArgsWithoutRequired {
  required?: undefined
}

interface GetFileFieldSchemaArgsWithRequired {
  required: string
}

/**
 * @summary Get file field schema type
 * @description Use function overloads to infer a different output type depending on the required option
 */

type GetFileFieldSchemaWithoutRequired = z.ZodUnion<
  readonly [z.ZodFile, z.ZodCustom<UploadedFile, UploadedFile>, z.ZodNull]
>

type GetFileFieldSchemaWithRequired = z.ZodPipe<
  z.ZodUnion<readonly [z.ZodFile, z.ZodCustom<UploadedFile, UploadedFile>, z.ZodNull]>,
  z.ZodTransform<File | UploadedFile, File | UploadedFile | null>
>

/**
 * @summary Get file field schema
 * @description This function is used to get the file field schema based on the field configuration
 * @type input: File | UploadedFile | null
 * @type output (optional): File | UploadedFile | null
 * @type output (required): File | UploadedFile
 */

export function getFileFieldSchema(args?: GetFileFieldSchemaArgsWithoutRequired): GetFileFieldSchemaWithoutRequired

export function getFileFieldSchema(args: GetFileFieldSchemaArgsWithRequired): GetFileFieldSchemaWithRequired

export function getFileFieldSchema(
  args?: GetFileFieldSchemaArgsWithoutRequired | GetFileFieldSchemaArgsWithRequired
): GetFileFieldSchemaWithoutRequired | GetFileFieldSchemaWithRequired {
  const { required } = args ?? {}

  const schema = z.union([z.file(), z.custom<UploadedFile>(), z.null()])

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
 * @summary File field input value type
 * @description This type is used to get the file field input value type
 */

export type FileFieldInputValue = z.input<ReturnType<typeof getFileFieldSchema>>
