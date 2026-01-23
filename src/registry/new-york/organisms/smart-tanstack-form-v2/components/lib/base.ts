import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import AutocompleteWithInfiniteQueryField from '../autocomplete-with-infinite-query-field'
import AutocompleteWithOptionsField from '../autocomplete-with-options-field'
import AutocompleteWithQueryField from '../autocomplete-with-query-field'
import CheckboxField from '../checkbox-field'
import DateField from '../date-field'
import EditorField from '../editor-field'
import FileField from '../file-field'
import InputField from '../input-field'
import MultiFileField from '../multi-file-field'
import MultiSelectWithInfiniteQueryField from '../multi-select-with-infinite-query-field'
import MultiSelectWithOptionsField from '../multi-select-with-options-field'
import MultiSelectWithQueryField from '../multi-select-with-query-field'
import NumberField from '../number-field'
import PasswordField from '../password-field'
import PhoneNumberField from '../phone-number-field'
import SelectWithInfiniteQueryField from '../select-with-infinite-query-field'
import SelectWithOptionsField from '../select-with-options-field'
import SelectWithQueryField from '../select-with-query-field'
import TextareaField from '../textarea-field'

// Form
const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: InputField,
    Textarea: TextareaField,
    PhoneNumber: PhoneNumberField,
    Number: NumberField,
    Password: PasswordField,
    SelectWithOptions: SelectWithOptionsField,
    SelectWithQuery: SelectWithQueryField,
    SelectWithInfiniteQuery: SelectWithInfiniteQueryField,
    MultiSelectWithOptions: MultiSelectWithOptionsField,
    MultiSelectWithQuery: MultiSelectWithQueryField,
    MultiSelectWithInfiniteQuery: MultiSelectWithInfiniteQueryField,
    AutocompleteWithOptions: AutocompleteWithOptionsField,
    AutocompleteWithQuery: AutocompleteWithQueryField,
    AutocompleteWithInfiniteQuery: AutocompleteWithInfiniteQueryField,
    Date: DateField,
    Checkbox: CheckboxField,
    File: FileField,
    MultiFile: MultiFileField,
    Editor: EditorField
  },
  formComponents: {},
  fieldContext,
  formContext
})

export { useAppForm, useFieldContext, useFormContext }
