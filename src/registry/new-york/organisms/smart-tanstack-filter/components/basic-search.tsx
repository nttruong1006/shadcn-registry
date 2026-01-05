import { useStore } from '@tanstack/react-form'
import { useDebounce } from '@uidotdev/usehooks'
import { Search } from 'lucide-react'
import React from 'react'
import { Field } from '@/components/ui/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/components/ui/input-group'
import { basicSearchFormSchema, defaultBasicSearchFormValue, useAppForm } from './lib'
import { useSmartFilterContext } from './smart-filter'

// Component
const BasicSearch = React.memo(() => {
  // Hooks
  const { id, setFilters } = useSmartFilterContext()

  const basicSearchForm = useAppForm({
    formId: `${id}-basic-search`,
    defaultValues: defaultBasicSearchFormValue,
    validators: {
      onSubmit: basicSearchFormSchema
    }
  })

  const formKeyword = useStore(basicSearchForm.store, (state) => state.values.keyword)
  const debouncedFormKeyword = useDebounce<string>(formKeyword.trim(), 400)

  // Effects
  React.useEffect(() => {
    setFilters(debouncedFormKeyword)
  }, [debouncedFormKeyword, setFilters])

  // Template
  return (
    <form id={basicSearchForm.formId} onSubmit={(e) => e.preventDefault()}>
      <basicSearchForm.AppField name='keyword'>
        {(field) => {
          const isInvalid = field.state.meta.isTouched && !field.state.meta.isValid
          return (
            <Field data-invalid={isInvalid}>
              <InputGroup>
                <InputGroupInput
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  aria-invalid={isInvalid}
                  placeholder='Search'
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
                <InputGroupAddon>
                  <Search />
                </InputGroupAddon>
              </InputGroup>
            </Field>
          )
        }}
      </basicSearchForm.AppField>
    </form>
  )
})

BasicSearch.displayName = 'BasicSearch'
export default BasicSearch
