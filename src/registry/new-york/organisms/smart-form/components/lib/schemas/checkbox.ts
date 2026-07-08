import z from 'zod'

/**
 * @summary Get checkbox field schema
 * @description This function is used to get the checkbox field schema based on the field configuration
 * @type input: boolean
 * @type output: boolean
 */

export function getCheckboxFieldSchema() {
  return z.boolean()
}

/**
 * @summary Checkbox field input value type
 * @description This type is used to get the checkbox field input value type
 */

export type CheckboxFieldInputValue = z.input<ReturnType<typeof getCheckboxFieldSchema>>
