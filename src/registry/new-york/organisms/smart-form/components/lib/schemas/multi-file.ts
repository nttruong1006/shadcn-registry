import z from 'zod'
import type { UploadedFile } from '@/components/molecules/file-upload/lib'

/**
 * @summary Get multi file field schema args type
 */

interface GetMultiFileFieldSchemaArgs {
  required?: string
}

/**
 * @summary Get multi file field schema
 * @description This function is used to get the multi file field schema based on the field configuration
 * @type input: Array<File | UploadedFile>
 * @type output: Array<File | UploadedFile>
 */

export function getMultiFileFieldSchema(args?: GetMultiFileFieldSchemaArgs) {
  const { required } = args ?? {}

  let schema = z.array(z.custom<File | UploadedFile>())

  // Required
  if (required) {
    schema = schema.min(1, required)
  }

  return schema
}

/**
 * @summary Multi file field input value type
 * @description This type is used to get the multi file field input value type
 */

export type MultiFileFieldInputValue = z.input<ReturnType<typeof getMultiFileFieldSchema>>
