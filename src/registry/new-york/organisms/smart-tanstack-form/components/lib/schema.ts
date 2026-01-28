import { toDate } from 'date-fns'
import { isValidPhoneNumber } from 'react-phone-number-input'
import z, { type ZodArray, type ZodNullable, type ZodNumber, type ZodPipe, type ZodString, type ZodType } from 'zod'
import type { UploadedFile } from '@/registry/new-york/molecules/file-upload/components/lib'
import type { FormValue, SmartFormData } from './base'

// Schema options
export interface SchemaOptions<T = FormValue> {
  hiddenFields?: Record<string, boolean | undefined>
  slots?: Record<string, z.ZodTypeAny>
  refinement?: (arg: T, ctx: z.core.$RefinementCtx<T>) => void | Promise<void>
}

// Get form schema
export const getFormSchema = (formData: SmartFormData, schemaOptions?: SchemaOptions) => {
  const shape: Record<string, ZodType> = {}

  const passwordConfirmationFields: Array<{
    code: string
    referenceFields: NonNullable<
      NonNullable<SmartFormData['templates'][number]['fields'][number]['config']>['referenceFields']
    >
  }> = []

  for (const template of formData.templates) {
    for (const field of template.fields) {
      const { code, type, config: { validation, isPasswordConfirmation, referenceFields } = {} } = field

      // Hidden fields
      if (schemaOptions?.hiddenFields?.[code]) {
        break
      }

      // Visible fields
      switch (type) {
        // input | textarea | phone-number | autocomplete | autocomplete-with-infinite-query | editor (string)
        case 'input':
        case 'textarea':
        case 'phone-number':
        case 'autocomplete-with-options':
        case 'autocomplete-with-query':
        case 'autocomplete-with-infinite-query':
        case 'editor': {
          let fieldSchema: ZodString | ZodPipe<ZodType> = z.string().trim()

          if (!validation) {
            shape[code] = fieldSchema
            break
          }

          // Email
          if (validation.email) {
            fieldSchema = fieldSchema.refine((value) => {
              try {
                if (!(validation.required || value)) {
                  return true
                }
                return Boolean(z.email().parse(value))
              } catch {
                return false
              }
            }, validation.email.message)

            shape[code] = fieldSchema
            break
          }

          // Required
          if (validation.required) {
            fieldSchema = fieldSchema.min(1, validation.required.message)
          }

          // Min
          if (validation.min) {
            fieldSchema = fieldSchema.min(validation.min.value as number, validation.min.message)
          }

          // Max
          if (validation.max) {
            fieldSchema = fieldSchema.max(validation.max.value as number, validation.max.message)
          }

          // Regex
          if (validation.regex) {
            const value = validation.regex.value as {
              pattern: string
              flags: string
            }
            fieldSchema = fieldSchema.regex(new RegExp(value.pattern, value.flags), validation.regex.message)
          }

          // Phone
          if (validation.phone) {
            fieldSchema = fieldSchema.refine(
              (value) => (value ? isValidPhoneNumber(value) : true),
              validation.phone.message
            )
          }

          shape[code] = fieldSchema
          break
        }

        // password (string)
        case 'password': {
          let fieldSchema: ZodString | ZodPipe<ZodType> = z.string().trim()

          if (isPasswordConfirmation) {
            if (referenceFields && referenceFields.length > 0) {
              passwordConfirmationFields.push({
                code,
                referenceFields
              })
            }

            shape[code] = fieldSchema
            break
          }

          if (!validation) {
            shape[code] = fieldSchema
            break
          }

          // Required
          if (validation.required) {
            fieldSchema = fieldSchema.min(1, validation.required.message)
          }

          // Min
          if (validation.min) {
            fieldSchema = fieldSchema.min(validation.min.value as number, validation.min.message)
          }

          // Max
          if (validation.max) {
            fieldSchema = fieldSchema.max(validation.max.value as number, validation.max.message)
          }

          // Regex
          if (validation.regex) {
            const value = validation.regex.value as {
              pattern: string
              flags: string
            }
            fieldSchema = fieldSchema.regex(new RegExp(value.pattern, value.flags), validation.regex.message)
          }

          shape[code] = fieldSchema
          break
        }

        // select-with-options | select-with-query | select-with-infinite-query | radio (string)
        case 'select-with-options':
        case 'select-with-query':
        case 'select-with-infinite-query':
        case 'radio': {
          let fieldSchema: ZodNullable<ZodString> | ZodPipe<ZodNullable<ZodString>> = z.string().trim().nullable()

          if (!validation) {
            shape[code] = fieldSchema
            break
          }

          // Required
          if (validation.required) {
            fieldSchema = fieldSchema.refine((value) => value != null, validation.required.message)
          }

          shape[code] = fieldSchema
          break
        }

        // number (string | number)
        case 'number': {
          let fieldSchema: ZodNumber = z.number()

          if (!validation) {
            shape[code] = z.preprocess((value) => (Number.isNaN(Number(value)) ? 0 : Number(value)), fieldSchema)
            break
          }

          // Required
          if (validation.required) {
            fieldSchema = fieldSchema.positive(validation.required.message)
          }

          // Min
          if (validation.min) {
            fieldSchema = fieldSchema.gte(validation.min.value as number, validation.min.message)
          }

          // Max
          if (validation.max) {
            fieldSchema = fieldSchema.lte(validation.max.value as number, validation.max.message)
          }

          shape[code] = z.preprocess((value) => (Number.isNaN(Number(value)) ? 0 : Number(value)), fieldSchema)
          break
        }

        // multi-select-with-options | multi-select-with-query | multi-select-with-infinite-query (string[])
        case 'multi-select-with-options':
        case 'multi-select-with-query':
        case 'multi-select-with-infinite-query': {
          let fieldSchema: ZodArray<ZodString> = z.array(z.string())

          if (!validation) {
            shape[code] = fieldSchema
            break
          }

          // Required
          if (validation.required) {
            fieldSchema = fieldSchema.min(1, validation.required.message)
          }

          shape[code] = fieldSchema
          break
        }

        // date (iso string | Date)
        case 'date': {
          if (!validation) {
            shape[code] = z.codec(z.union([z.iso.datetime(), z.date()]).nullable(), z.iso.datetime().nullable(), {
              decode: (value) => {
                if (!value) {
                  return null
                }
                if (typeof value === 'string') {
                  return value
                }
                return value.toISOString()
              },
              encode: (value) => (value ? toDate(value) : null)
            })
            break
          }

          // Required
          if (validation.required) {
            shape[code] = z.codec(
              z.union([z.iso.datetime(), z.date()]).nullable(),
              z.iso.datetime().nullable().refine(Boolean, validation.required.message),
              {
                decode: (value) => {
                  if (!value) {
                    return null
                  }
                  if (typeof value === 'string') {
                    return value
                  }
                  return value.toISOString()
                },
                encode: (value) => (value ? toDate(value) : null)
              }
            )
            break
          }
          break
        }

        // checkbox (boolean)
        case 'checkbox': {
          shape[code] = z.boolean()
          break
        }

        // file (File | UploadedFile | null)
        case 'file': {
          let fieldSchema: ZodType<File | UploadedFile | null> | ZodPipe<ZodType<File | UploadedFile | null>> =
            z.custom<File | UploadedFile | null>()

          if (!validation) {
            shape[code] = fieldSchema
            break
          }

          // Required
          if (validation.required) {
            fieldSchema = fieldSchema.refine((value) => Boolean(value), validation.required.message)
          }

          shape[code] = fieldSchema
          break
        }

        // multi-file (Array<File | UploadedFile>)
        case 'multi-file': {
          let fieldSchema: ZodArray<ZodType<File | UploadedFile>> | ZodPipe<ZodArray<ZodType<File | UploadedFile>>> =
            z.array(z.custom<File | UploadedFile>())

          if (!validation) {
            shape[code] = fieldSchema
            break
          }

          // Required
          if (validation.required) {
            fieldSchema = fieldSchema.refine((value) => value.length > 0, validation.required.message)
          }

          shape[code] = fieldSchema
          break
        }

        // Slot
        case 'slot': {
          const slotFieldSchema = schemaOptions?.slots?.[code]
          if (slotFieldSchema) {
            shape[code] = slotFieldSchema
          }
          break
        }

        // Default
        default: {
          break
        }
      }
    }
  }

  let schema = z.object(shape)

  if (passwordConfirmationFields.length > 0) {
    schema = schema.superRefine((arg, ctx) => {
      for (const passwordConfirmationField of passwordConfirmationFields) {
        const { code, referenceFields } = passwordConfirmationField
        const referenceField = referenceFields[0]
        if (arg[code] !== arg[referenceField.code]) {
          ctx.addIssue({
            code: 'custom',
            message: referenceField.message,
            path: [code]
          })
        }
      }
    })
  }

  if (schemaOptions?.refinement) {
    schema = schema.superRefine(schemaOptions.refinement)
  }

  return schema
}
