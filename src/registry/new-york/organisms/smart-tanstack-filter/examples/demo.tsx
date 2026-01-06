import React from 'react'
import { SmartFilter, type SmartFilterProps, SmartFilterType } from '@/components/organisms/smart-tanstack-filter'

// Component
export const SmartFilterDemo = () => {
  // Methods
  const setFilters: SmartFilterProps['setFilters'] = React.useCallback((formValue) => {
    console.log(formValue)
  }, [])

  // Memos
  const filters = React.useMemo<SmartFilterProps['filters']>(() => {
    return [
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
  }, [])

  // Template
  return (
    <div className='w-sm'>
      <SmartFilter filters={filters} setFilters={setFilters} />
    </div>
  )
}
