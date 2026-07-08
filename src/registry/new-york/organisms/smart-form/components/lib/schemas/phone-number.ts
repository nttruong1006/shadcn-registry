import { isValidPhoneNumber } from 'react-phone-number-input'
import z from 'zod'

/**
 * @summary Get phone number field schema args type
 */

interface GetPhoneNumberFieldSchemaArgs {
  phone: string
  required?: string
}

/**
 * @summary Get phone number field schema
 * @description This function is used to get the phone number field schema based on the field configuration
 * @type input: string
 * @type output: string
 */

export function getPhoneNumberFieldSchema(args?: GetPhoneNumberFieldSchemaArgs) {
  const { required, phone } = args ?? {}

  let schema = z.string().trim()

  // Required
  if (required) {
    schema = schema.min(1, required)
  }

  schema = schema.refine((value) => {
    try {
      if (!(required || value)) {
        return true
      }
      return isValidPhoneNumber(value)
    } catch {
      return false
    }
  }, phone)

  return schema
}

/**
 * @summary Phone number field input value type
 * @description This type is used to get the phone number field input value type
 */
export type PhoneNumberFieldInputValue = z.input<ReturnType<typeof getPhoneNumberFieldSchema>>
