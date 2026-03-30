import { ListFilterIcon, SearchIcon } from 'lucide-react'
import { Activity, createContext, useContext, useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/registry/new-york/ui/toggle-group/components/toggle-group.tsx'
import AdvancedFilter from './advanced-filter'
import BasicSearch from './basic-search'
import type { Filter } from './lib/base'
import type { AdvancedFilterFormValueOutput, BasicSearchFormValueOutput } from './lib/form'

// Smart filter
export enum Mode {
  BasicSearch = 'basic-search',
  AdvancedFilter = 'advanced-filter'
}

export type SmartFilterContextValue = Pick<SmartFilterProps, 'setFilters'> & {
  id: NonNullable<SmartFilterProps['id']>
  filters: NonNullable<SmartFilterProps['filters']>
}

const SmartFilterContext = createContext<SmartFilterContextValue | null>(null)

export const useSmartFilterContext = () => {
  const context = useContext(SmartFilterContext)
  if (!context) {
    throw new Error('useFiltersContext should be used within the SmartFilter')
  }
  return context
}

export interface SmartFilterProps {
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
  const [mode, setMode] = useState(Mode.BasicSearch)

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
        className='data-[variant=outline]:shadow-none'
        onValueChange={(value) => {
          if (value) {
            setMode(value as Mode)
          }
        }}
        type='single'
        value={mode}
        variant='outline'
      >
        <ToggleGroupItem value={Mode.BasicSearch}>
          <SearchIcon />
        </ToggleGroupItem>

        <ToggleGroupItem value={Mode.AdvancedFilter}>
          <ListFilterIcon />
        </ToggleGroupItem>
      </ToggleGroup>

      <Activity mode={mode === Mode.BasicSearch ? 'visible' : 'hidden'}>
        <BasicSearch />
      </Activity>

      <Activity mode={mode === Mode.AdvancedFilter ? 'visible' : 'hidden'}>
        <AdvancedFilter />
      </Activity>
    </div>
  )
}
