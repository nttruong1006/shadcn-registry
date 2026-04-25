import { createFormHook, createFormHookContexts } from '@tanstack/react-form'
import { lazy } from 'react'
import FormContainer from '../form-container'

const { fieldContext, formContext, useFieldContext, useFormContext } = createFormHookContexts()

const { useAppForm } = createFormHook({
  fieldComponents: {
    Input: lazy(() => import('../input-field')),
    Textarea: lazy(() => import('../textarea-field')),
    PhoneNumber: lazy(() => import('../phone-number-field')),
    Number: lazy(() => import('../number-field')),
    Password: lazy(() => import('../password-field')),
    SelectWithOptions: lazy(() => import('../select-with-options-field')),
    SelectWithQuery: lazy(() => import('../select-with-query-field')),
    SelectWithInfiniteQuery: lazy(() => import('../select-with-infinite-query-field')),
    MultiSelectWithOptions: lazy(() => import('../multi-select-with-options-field')),
    MultiSelectWithQuery: lazy(() => import('../multi-select-with-query-field')),
    MultiSelectWithInfiniteQuery: lazy(() => import('../multi-select-with-infinite-query-field')),
    AutocompleteWithOptions: lazy(() => import('../autocomplete-with-options-field')),
    AutocompleteWithQuery: lazy(() => import('../autocomplete-with-query-field')),
    AutocompleteWithInfiniteQuery: lazy(() => import('../autocomplete-with-infinite-query-field')),
    Date: lazy(() => import('../date-field')),
    Checkbox: lazy(() => import('../checkbox-field')),
    File: lazy(() => import('../file-field')),
    MultiFile: lazy(() => import('../multi-file-field')),
    Editor: lazy(() => import('../editor-field'))
  },
  formComponents: {
    FormContainer
  },
  fieldContext,
  formContext
})

export { useAppForm, useFieldContext, useFormContext }
