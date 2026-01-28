import { useStore } from '@tanstack/react-form'
import { useDebounce } from '@uidotdev/usehooks'
import { Search } from 'lucide-react'
import { memo, useEffect } from 'react'
import { Field } from '@/registry/new-york/ui/field/components/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/new-york/ui/input-group/components/input-group'
import { basicSearchFormSchema, defaultBasicSearchFormValue, useAppForm } from './lib/form'
import { useSmartFilterContext } from './smart-filter'

// Component
const BasicSearch = memo(() => {
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
  useEffect(() => {
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
                  aria-invalid={isInvalid}
                  id={field.name}
                  name={field.name}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder='Search'
                  value={field.state.value}
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
