import { ListFilter, Search } from 'lucide-react'
import React from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import AdvancedFilter from './advanced-filter'
import BasicSearch from './basic-search'
import type { AdvancedFilterFormValueOutput, BasicSearchFormValueOutput, Filter } from './lib'

// Smart filter
export enum Mode {
  BasicSearch = 'basic-search',
  AdvancedFilter = 'advanced-filter'
}

export type SmartFilterContextValue = Pick<SmartFilterProps, 'setFilters'> & {
  id: NonNullable<SmartFilterProps['id']>
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

export type SmartFilterProps = {
  id?: string
  filters?: Filter[]
  isHideSearchMode?: boolean
  setFilters: (value: BasicSearchFormValueOutput['keyword'] | AdvancedFilterFormValueOutput['filters']) => void
}
const defaultFilters: Filter[] = []

export const SmartFilter = ({
  id = 'smart-form',
  filters = defaultFilters,
  isHideSearchMode = false,
  setFilters
}: SmartFilterProps) => {
  // Template
  return (
    <SmartFilterContext.Provider value={{ id, filters, setFilters }}>
      <SmartFilterContent filters={filters} isHideSearchMode={isHideSearchMode} />
    </SmartFilterContext.Provider>
  )
}

export const SmartFilterContent = ({
  filters = defaultFilters,
  isHideSearchMode = false
}: Pick<SmartFilterProps, 'filters' | 'isHideSearchMode'>) => {
  // States
  const [mode, setMode] = React.useState(Mode.BasicSearch)

  // Template
  if (filters.length === 0) {
    return <BasicSearch />
  }

  if (isHideSearchMode) {
    return <AdvancedFilter />
  }

  return (
    <div className='flex items-center gap-2'>
      <ToggleGroup
        type='single'
        variant='outline'
        value={mode}
        className='data-[variant=outline]:shadow-none'
        onValueChange={(value) => {
          if (!value) return
          setMode(value as Mode)
        }}
      >
        <ToggleGroupItem value={Mode.BasicSearch}>
          <Search />
        </ToggleGroupItem>

        <ToggleGroupItem value={Mode.AdvancedFilter}>
          <ListFilter />
        </ToggleGroupItem>
      </ToggleGroup>

      <React.Activity mode={mode === Mode.BasicSearch ? 'visible' : 'hidden'}>
        <BasicSearch />
      </React.Activity>

      <React.Activity mode={mode === Mode.AdvancedFilter ? 'visible' : 'hidden'}>
        <AdvancedFilter />
      </React.Activity>
    </div>
  )
}
