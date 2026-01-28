import { useDebounce } from '@uidotdev/usehooks'
import { SearchIcon } from 'lucide-react'
import { useEffect } from 'react'
import { Controller, useFormContext, useWatch } from 'react-hook-form'
import { Field } from '@/registry/new-york/ui/field/components/field'
import { InputGroup, InputGroupAddon, InputGroupInput } from '@/registry/new-york/ui/input-group/components/input-group'
import type { SmartFilterFormInput, SmartFilterFormOutput } from './lib'
import type { SmartFilterProps } from './smart-filter'

// Component
const BasicSearch = ({ setFilters }: Pick<SmartFilterProps, 'setFilters'>) => {
  // Hooks
  const form = useFormContext<SmartFilterFormInput, unknown, SmartFilterFormOutput>()

  const formSearch = useWatch({
    name: 'search',
    control: form.control
  })

  const debouncedFormSearch = useDebounce<string>(formSearch.trim(), 400)

  // Effects
  useEffect(() => {
    setFilters({ search: debouncedFormSearch, filters: [] })
  }, [debouncedFormSearch, setFilters])

  // Template
  return (
    <Controller
      control={form.control}
      name='search'
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <InputGroup>
            <InputGroupInput {...field} aria-invalid={fieldState.invalid} placeholder='Search' />
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
          </InputGroup>
        </Field>
      )}
    />
  )
}

export default BasicSearch
