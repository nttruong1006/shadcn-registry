import { ListFilterIcon, SearchIcon } from 'lucide-react'
import { createContext, useContext, useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/atoms/tabs'
import AdvancedFilter from './advanced-filter'
import BasicSearch from './basic-search'
import type { Filter } from './lib/base'
import type { AdvancedFilterFormValueOutput, BasicSearchFormValueOutput } from './lib/form'

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

export function SmartFilter({
  id = 'smart-form',
  filters = defaultFilters,
  isHideSearchMode = false,
  setFilters
}: SmartFilterProps) {
  return (
    <SmartFilterContext.Provider value={{ id, filters, setFilters }}>
      <SmartFilterContent filters={filters} isHideSearchMode={isHideSearchMode} />
    </SmartFilterContext.Provider>
  )
}

function SmartFilterContent({
  filters = defaultFilters,
  isHideSearchMode = false
}: Pick<SmartFilterProps, 'filters' | 'isHideSearchMode'>) {
  const [mode, setMode] = useState(Mode.BasicSearch)

  if (filters.length === 0) {
    return <BasicSearch />
  }

  if (isHideSearchMode) {
    return <AdvancedFilter />
  }

  return (
    <Tabs className='flex flex-row items-center gap-2' onValueChange={(value) => setMode(value)} value={mode}>
      <TabsList>
        <TabsTrigger value={Mode.BasicSearch}>
          <SearchIcon />
        </TabsTrigger>
        <TabsTrigger value={Mode.AdvancedFilter}>
          <ListFilterIcon />
        </TabsTrigger>
      </TabsList>
      <TabsContent value={Mode.BasicSearch}>
        <BasicSearch />
      </TabsContent>
      <TabsContent value={Mode.AdvancedFilter}>
        <AdvancedFilter />
      </TabsContent>
    </Tabs>
  )
}
