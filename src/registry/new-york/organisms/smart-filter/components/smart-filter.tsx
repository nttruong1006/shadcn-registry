import { ListFilter, Search } from 'lucide-react'
import React from 'react'
import { FormProvider, type SubmitHandler, type UseFormReturn, useFieldArray } from 'react-hook-form'
import { ToggleGroup, ToggleGroupItem } from '@/registry/new-york/ui/toggle-group/components/toggle-group'
import AdvancedFilter from './advanced-filter'
import BasicSearch from './basic-search'
import {
  defaultValuePerOperation,
  type Filter,
  operationsPerType,
  type SmartFilterFormInput,
  type SmartFilterFormOutput
} from './lib'

// Smart filter
enum Mode {
  BasicSearch = 'basic-search',
  AdvancedFilter = 'advanced-filter'
}

export interface SmartFilterContextValue {
  filters: NonNullable<SmartFilterProps['filters']>
}

const SmartFilterContext = React.createContext<SmartFilterContextValue | null>(null)

export const useSmartFilterContext = () => {
  const context = React.useContext(SmartFilterContext)
  if (!context) {
    throw new Error('useFiltersContext should be used within the SmartFilter')
  }
  return context
}

export interface SmartFilterProps {
  form: UseFormReturn<SmartFilterFormInput, unknown, SmartFilterFormOutput>
  filters?: Filter[]
  isHideSearchMode?: boolean
  setFilters: SubmitHandler<SmartFilterFormOutput>
}

const DEFAULT_FILTERS: Filter[] = []

export const SmartFilter = ({
  form,
  filters = DEFAULT_FILTERS,
  isHideSearchMode = false,
  setFilters
}: SmartFilterProps) => {
  // Hooks
  const formFilters = useFieldArray({
    control: form.control,
    name: 'filters'
  })

  // States
  const [mode, setMode] = React.useState<Mode>(() =>
    (form.formState.defaultValues?.filters ?? DEFAULT_FILTERS).length > 0 ? Mode.AdvancedFilter : Mode.BasicSearch
  )

  // Methods
  const addFilter = (filter: Filter) => {
    const { name, type } = filter
    const operation = operationsPerType[type][0]
    formFilters.append({
      name,
      type,
      operation,
      value: defaultValuePerOperation[operation]
    })
  }

  const changeMode = (value: string) => {
    setMode(value as Mode)
    switch (value) {
      case Mode.BasicSearch: {
        formFilters.remove()
        break
      }
      case Mode.AdvancedFilter: {
        form.resetField('search')
        if (filters.length > 0) {
          addFilter(filters[0])
        }
        break
      }
      default: {
        break
      }
    }
  }

  // Template
  if (form.formState.isLoading) {
    return null
  }

  return (
    <SmartFilterContext.Provider
      value={{
        filters
      }}
    >
      <FormProvider {...form}>
        <form className='w-full' onSubmit={(e) => e.preventDefault()}>
          {filters.length === 0 ? (
            <BasicSearch setFilters={setFilters} />
            // biome-ignore lint/style/noNestedTernary: ignore
          ) : isHideSearchMode ? (
            <AdvancedFilter addFilter={addFilter} formFilters={formFilters} setFilters={setFilters} />
          ) : (
            <div className='flex items-center gap-2'>
              <ToggleGroup
                className='data-[variant=outline]:shadow-none'
                onValueChange={changeMode}
                type='single'
                value={mode}
                variant='outline'
              >
                <ToggleGroupItem value={Mode.BasicSearch}>
                  <Search />
                </ToggleGroupItem>

                <ToggleGroupItem value={Mode.AdvancedFilter}>
                  <ListFilter />
                </ToggleGroupItem>
              </ToggleGroup>

              {mode === Mode.BasicSearch ? (
                <BasicSearch setFilters={setFilters} />
              ) : (
                <AdvancedFilter addFilter={addFilter} formFilters={formFilters} setFilters={setFilters} />
              )}
            </div>
          )}
        </form>
      </FormProvider>
    </SmartFilterContext.Provider>
  )
}
