import { useCallback } from 'react'
import { type Filter, transformFormValueToApiFiltersParam } from '@/components/organisms/smart-filter/lib/base'
import { SmartFilter, type SmartFilterProps } from '@/components/organisms/smart-filter/smart-filter'

const filters: Filter[] = [
  {
    name: 'fullName',
    label: 'Full name',
    type: 'input'
  },
  {
    name: 'age',
    label: 'Age',
    type: 'number'
  },
  {
    name: 'graduationDate',
    label: 'Graduation date',
    type: 'date'
  },
  {
    name: 'department',
    label: 'Department',
    type: 'selectWithOptions',
    options: [
      { value: 'front-end', label: 'Front-end' },
      { value: 'back-end', label: 'Back-end' }
    ]
  },
  {
    name: 'role',
    label: 'Role',
    type: 'selectWithQuery',
    apiPath: 'https://gateway.dev.meu-solutions.com/fosco/api/version/1.0/options/role'
  },
  {
    name: 'infinite test',
    label: 'Infinite test',
    type: 'selectWithInfiniteQuery',
    apiPath: 'https://gateway.dev.meu-solutions.com/fosco/api/version/1.0/options/clerical/sender'
  }
]

export function SmartFilterDemo() {
  const setFilters: SmartFilterProps['setFilters'] = useCallback((formValue) => {
    const filtersParam = transformFormValueToApiFiltersParam(formValue, filters)
    console.log(filtersParam)
  }, [])

  return (
    <div className='w-xs'>
      <SmartFilter filters={filters} setFilters={setFilters} />
    </div>
  )
}
