import { useCallback } from 'react'
import { type Filter, transformFormValueToApiFiltersParam } from '@/components/organisms/smart-filter/lib/base'
import { SmartFilter, type SmartFilterProps } from '@/components/organisms/smart-filter/smart-filter'

const filters: Filter[] = [
  {
    label: 'Full name',
    name: 'fullName',
    type: 'input'
  },
  {
    label: 'Age',
    name: 'age',
    type: 'number'
  },
  {
    label: 'Graduation date',
    name: 'graduationDate',
    type: 'date'
  },
  {
    label: 'Department',
    name: 'department',
    options: [
      { label: 'Front-end', value: 'front-end' },
      { label: 'Back-end', value: 'back-end' }
    ],
    type: 'selectWithOptions'
  },
  {
    apiPath: 'https://gateway.dev.meu-solutions.com/fosco/api/version/1.0/options/role',
    label: 'Role',
    name: 'role',
    type: 'selectWithQuery'
  },
  {
    apiPath: 'https://gateway.dev.meu-solutions.com/fosco/api/version/1.0/options/clerical/sender',
    label: 'Sender',
    name: 'sender',
    type: 'selectWithInfiniteQuery'
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
