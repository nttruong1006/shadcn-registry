import React from 'react'
import {
  type Filter,
  SmartFilter,
  type SmartFilterProps,
  SmartFilterType,
  transformFormValueToApiFiltersParam
} from '@/components/organisms/smart-tanstack-filter'

// Component
const filters: Filter[] = [
  {
    name: 'fullName',
    label: 'Full name',
    type: SmartFilterType.Input
  },
  {
    name: 'age',
    label: 'Age',
    type: SmartFilterType.Number
  },
  {
    name: 'graduationDate',
    label: 'Graduation date',
    type: SmartFilterType.Date
  },
  {
    name: 'department',
    label: 'Department',
    type: SmartFilterType.SelectWithOptions,
    options: [
      { value: 'front-end', label: 'Front-end' },
      { value: 'back-end', label: 'Back-end' }
    ]
  },
  {
    name: 'technologies',
    label: 'Technologies',
    type: SmartFilterType.SelectWithQuery,
    apiPath: '/version/1.0/options/role',
    options: [
      { value: 'react', label: 'React' },
      { value: 'tailwind-css', label: 'TailwindCSS' },
      { value: 'astro', label: 'Astro' },
      { value: 'ts', label: 'TypeScript' }
    ]
  }
]

export const SmartFilterDemo = () => {
  // Methods
  const setFilters: SmartFilterProps['setFilters'] = React.useCallback((formValue) => {
    const filtersParam = transformFormValueToApiFiltersParam(formValue, filters)
    console.log(filtersParam)
  }, [])

  // Template
  return (
    <div className='w-sm'>
      <SmartFilter filters={filters} setFilters={setFilters} />
    </div>
  )
}
